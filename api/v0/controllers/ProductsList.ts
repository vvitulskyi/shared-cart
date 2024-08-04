import "dotenv/config";
import { Router } from "express";
import ProductModel from "../models/Product.js";
import products from "../../untils/products-list.js";

class ProductsList {
  router: Router;
  constructor() {
    this.router = Router();

    // Get newest products
    this.router.get("/products/newest", async (req, res) => {
      try {
        const doc = await ProductModel.find().limit(35);
        res.status(200).json(doc);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Something is wrong...",
        });
      }
    });

    // Create product
    this.router.post("/products/create-list", async (req, res) => {
      try {
        ProductModel.insertMany(products)
          .then((docs) => {
            res.status(200).json(docs);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Something is wrong...",
        });
      }
    });
  }
}

export default ProductsList;
