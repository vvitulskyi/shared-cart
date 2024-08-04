import "dotenv/config";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import SharedCartLinkModel from "../models/SharedCartLink.js";
import SharedCartModel from "../models/SharedCart.js";
import UserModel from "../models/User.js";
import ProductModel from "../models/Product.js";
import checkAuth from "../../untils/checkAuth.js";
import WebSocket from "ws";
import { ICartItem, IProduct, IProductQuatitied } from "@interfaces/index.js";
import { Types } from "mongoose";

class SharedCart {
  router: Router;
  constructor() {
    this.router = Router();

    // Connect to shared cart by link
    this.router.get(
      "/shared-cart/connection/:link",
      checkAuth,
      async (req, res) => {
        try {
          const { params, user_id } = req;

          const { link } = params;

          const user = await UserModel.findById(user_id);

          if (!user) {
            res.status(500).json({
              message: "Non-existent user",
            });
            return;
          }

          const cart = await SharedCartLinkModel.findOne({
            link,
          });

          if (!cart) {
            const { password_hash, ...userDoc } = user;
            res.status(200).json(userDoc);
            return;
          }

          if (user.shared_carts.includes(cart._id)) {
            const { password_hash, ...userDoc } = user;
            res.status(200).json(userDoc);
            return;
          }

          user.shared_carts.unshift(cart._id);

          await user.save();

          await cart.deleteOne();

          const { password_hash, ...userDoc } = user;
          res.status(200).json(userDoc);
        } catch (err) {
          console.log(err);
          res.status(500).json({
            message: "Something is wrong...",
          });
        }
      }
    );

    // Create link for shared cart
    this.router.post(
      "/shared-cart/link/create",
      checkAuth,
      async (req, res) => {
        try {
          const { cart_id } = req.body;

          const secretLink = jwt.sign(
            {
              _id: cart_id,
            },
            process.env.LINK_SECRET_KEY
          );

          const doc = new SharedCartLinkModel({
            link: encodeURIComponent(secretLink),
            cart_id,
          });

          const link = await doc.save();

          res.status(200).json(link);
        } catch (err) {
          console.log(err);
          res.status(500).json({
            message: "Something is wrong...",
          });
        }
      }
    );

    // Create shared cart
    this.router.patch("/shared-cart/create", checkAuth, async (req, res) => {
      try {
        const user = await UserModel.findById(req.user_id);

        if (!user) {
          res.status(500).json({
            message: "User not found",
          });
          return;
        }
        const cart = new SharedCartModel({
          items: [],
          createdAt: new Date(),
        });

        const cartItem = await cart.save();
        user.shared_carts.unshift(cartItem._id);
        await user.save();
        const { password_hash, ...userData } = user;

        res.status(200).json(userData);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Something is wrong...",
        });
      }
    });

    // Get shared cart products
    this.router.get("/shared-cart/:cart_id", checkAuth, async (req, res) => {
      try {
        const { user_id, params } = req;
        const { cart_id } = params;
        const c_id = new ObjectId(cart_id);

        const user = await UserModel.findById(user_id);

        if (!user || !user.shared_carts.includes(c_id)) {
          res.status(500).json({
            message: "No access to the cart",
          });
          return;
        }

        const cart = await SharedCartModel.findById(c_id);

        if (!cart) {
          res.status(500).json({
            message: "Cart not found",
          });
          return;
        }

        const products = await ProductModel.find(
          {
            _id: {
              $in: cart.items.map((o) => o.item_id),
            },
          },
          {
            _id: 1,
            name: 1,
            description: 1,
            price: 1,
            currency: 1,
          }
        ).lean();

        cart.items = this.clearingCartOfMissingItems(products, cart.items);
        await cart.save();
        const countedProducts = this.quantityFromCart(products, cart.items);

        res.status(200).json(countedProducts);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Something is wrong...",
        });
      }
    });

    // Get shared cart products NEW
    this.router.get(
      "/shared-cart/:cart_id/norm",
      checkAuth,
      async (req, res) => {
        try {
          const { user_id, params } = req;
          const { cart_id } = params;
          const c_id = new ObjectId(cart_id);

          const user = await UserModel.findById(user_id);

          if (!user || !user.shared_carts.includes(c_id)) {
            res.status(500).json({
              message: "No access to the cart",
            });
            return;
          }

          const countedProducts = await SharedCartModel.aggregate([
            { $match: { _id: c_id } },
            { $unwind: "$items" },
            {
              $lookup: {
                from: "products",
                localField: "items.item_id",
                foreignField: "_id",
                as: "items.productDetails",
              },
            },
            { $unwind: "$items.productDetails" },
            {
              $addFields: {
                items: {
                  productDetails: {
                    quantity: "$items.quantity",
                    addedToCartAt: "$items.addedToCartAt",
                  },
                },
              },
            },
            {
              $replaceRoot: { newRoot: "$items.productDetails" },
            },
            {
              $project: {
                _id: 1,
                name: 1,
                description: 1,
                price: 1,
                currency: 1,
                quantity: 1,
                addedToCartAt: 1,
              },
            },
            { $sort: { addedToCartAt: -1 } },
          ]);

          res.status(200).json(countedProducts);
        } catch (err) {
          console.log(err);
          res.status(500).json({
            message: "Something is wrong...",
          });
        }
      }
    );

    // Add item to shared cart
    this.router.patch("/shared-cart/add-item", checkAuth, async (req, res) => {
      try {
        const { product_id, cart_id } = req.body;

        const product = await ProductModel.findById(product_id);

        if (!product) {
          res.status(500).json({
            message: "Product not found",
          });
          return;
        }

        const cart = await SharedCartModel.findById(cart_id);

        if (!cart) {
          res.status(500).json({
            message: "No access to the cart",
          });
          return;
        }

        cart.items = this.editQantity(cart.items, product_id, 1, true);

        const products = await ProductModel.find(
          {
            _id: {
              $in: cart.items.map((o) => o.item_id),
            },
          },
          {
            _id: 1,
            name: 1,
            description: 1,
            price: 1,
            currency: 1,
          }
        ).lean();

        cart.items = this.clearingCartOfMissingItems(products, cart.items);
        await cart.save();
        const countedProducts = this.quantityFromCart(products, cart.items);

        req.wss.clients.forEach((client: WebSocket) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ cart_id, items: countedProducts }));
          }
        });

        res.status(200).json(countedProducts);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Something is wrong...",
        });
      }
    });

    // Edit item quantity
    this.router.patch(
      "/shared-cart/set-quantity",
      checkAuth,
      async (req, res) => {
        try {
          const { product_id, cart_id, quantity } = req.body;

          const product = await ProductModel.findById(product_id);

          if (!product) {
            res.status(500).json({
              message: "Product not found",
            });
            return;
          }

          const cart = await SharedCartModel.findById(cart_id);

          if (!cart) {
            res.status(500).json({
              message: "No access to the cart",
            });
            return;
          }

          cart.items = this.editQantity(cart.items, product_id, quantity);
          await cart.save();

          const products = await ProductModel.find(
            {
              _id: {
                $in: cart.items.map((o) => o.item_id),
              },
            },
            {
              _id: 1,
              name: 1,
              description: 1,
              price: 1,
              currency: 1,
            }
          ).lean();

          cart.items = this.clearingCartOfMissingItems(products, cart.items);
          await cart.save();
          const countedProducts = this.quantityFromCart(products, cart.items);

          req.wss.clients.forEach((client: WebSocket) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ cart_id, items: countedProducts }));
            }
          });

          res.status(200).json(countedProducts);
        } catch (err) {
          console.log(err);
          res.status(500).json({
            message: "Something is wrong...",
          });
        }
      }
    );

    // Clear shared cart
    this.router.patch("/shared-cart/clear", checkAuth, async (req, res) => {
      try {
        const { cart_id } = req.body;

        const cart = await SharedCartModel.findById(cart_id);

        if (!cart) {
          res.status(500).json({
            message: "No access to the cart",
          });
          return;
        }

        cart.items = new Types.DocumentArray<ICartItem>([]);

        await cart.save();

        req.wss.clients.forEach((client: WebSocket) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ cart_id, items: cart.items }));
          }
        });

        res.status(200).json(cart.items);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Something is wrong...",
        });
      }
    });
  }

  editQantity(
    items: Types.DocumentArray<ICartItem>,
    product_id: unknown,
    quantity: number,
    isAdding = false
  ) {
    const productIndex = items.findIndex(
      ({ item_id }) => item_id == product_id
    );

    if (!quantity) {
      items.splice(productIndex, 1);
    } else if (productIndex == -1) {
      items.push({ item_id: product_id, quantity });
    } else {
      items[productIndex].quantity = isAdding
        ? items[productIndex].quantity + quantity
        : quantity;
    }

    return items;
  }

  // Если товаров найденных в базе не столько сколько корзине, то ищем и удаляем лишние из корзины
  clearingCartOfMissingItems(
    products: IProduct[],
    cartItems: Types.DocumentArray<ICartItem>
  ) {
    if (products.length != cartItems.length) {
      const ids = products.map((o) => o._id.toString());
      const commonElements = cartItems.filter(({ item_id }) => {
        return ids.includes(item_id.toString());
      });
      cartItems.splice(0, cartItems.length);
      cartItems.push(commonElements);
    }

    return cartItems;
  }

  // Добавляем каунты у к товарам
  quantityFromCart(
    products: IProduct[],
    cartItems: Types.DocumentArray<ICartItem>
  ) {
    const countedProducts = products
      .reduce<IProductQuatitied[]>((acc, curr) => {
        const currId = curr._id.toString();
        const found = cartItems.find((o) => o.item_id.toString() == currId);
        if (found) {
          const newable: IProductQuatitied = {
            ...curr,
            quantity: found.quantity,
            addedToCartAt: found.addedToCartAt,
          };
          acc.push(newable);
        }
        return acc;
      }, [])
      .sort((f, s) => (f.addedToCartAt > s.addedToCartAt ? -1 : 1));

    return countedProducts;
  }
}

export default SharedCart;
