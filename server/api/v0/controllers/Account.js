import "dotenv/config";
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  loginValidator,
  registrationValidator,
} from "../validations/account.js";
import handleValidationErrors from "../../untils/handleValidationErrors.js";
import checkAuth from "../../untils/checkAuth.js";
import UserModel from "../models/User.js";
import SharedCartModel from "../models/SharedCart.js";

class Account {
  constructor() {
    this.router = new Router();

    // Login
    this.router.post(
      "/account/login",
      loginValidator,
      handleValidationErrors,
      async (req, res) => {
        try {
          const user = await UserModel.findOne({ email: req.body.email });
          if (!user) {
            return res.status(404).json({
              message: "User not found",
            });
          }
          const isValidPass = await bcrypt.compare(
            req.body.password,
            user._doc.password_hash
          );
          if (!isValidPass) {
            return res.status(400).json({
              message: "Incorrect username or password",
            });
          }

          const authToken = jwt.sign(
            {
              _id: user._id,
            },
            process.env.SECRET_KEY,
            {
              expiresIn: "30d",
            }
          );

          const { password_hash, _id, ...userData } = user._doc;

          res.status(200).json({
            ...userData,
            token: authToken,
          });
        } catch (err) {
          console.log(err);
          res.status(500).json({
            message: "Failed to authenticate",
          });
        }
      }
    );

    // Registration
    this.router.post(
      "/account/registration",
      registrationValidator,
      handleValidationErrors,
      async (req, res) => {
        try {
          const password = req.body.password;
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(password, salt);

          const cart = new SharedCartModel({
            items: [],
            createdAt: new Date(),
          });

          await cart.save();

          const user = new UserModel({
            email: req.body.email,
            password_hash: hash,
            shared_carts: [cart._id],
          });
          await user.save();

          const authToken = jwt.sign(
            {
              _id: user._id,
            },
            process.env.SECRET_KEY,
            {
              expiresIn: "30d",
            }
          );

          const { password_hash, ...userData } = user._doc;

          res.status(200).json({
            ...userData,
            token: authToken,
          });
        } catch (err) {
          console.log(err);
          res.status(500).json({
            message: "Failed to register",
          });
        }
      }
    );

    this.router.get("/account/check-auth", checkAuth, async (req, res) => {
      try {
        const user = await UserModel.findById(req.user_id);
        if (!user) {
          return res.status(404).json({
            message: "User not found",
          });
        }

        if (!user.shared_carts || !user.shared_carts.length) {
          const cart = new SharedCartModel({
            items: [],
            createdAt: new Date(),
          });

          const cartItem = await cart.save();

          user.shared_carts[0] = cartItem;
          await user.save();
        }

        const { password_hash, ...userData } = user._doc;

        res.status(200).json({
          ...userData,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Failed to authenticate",
        });
      }
    });
  }
}

export default Account;
