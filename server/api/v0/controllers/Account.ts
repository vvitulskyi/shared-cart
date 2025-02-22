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
import { Request, Response } from "express";

class Account {
  router: Router;
  constructor() {
    this.router = Router();

    // Login
    this.router.post(
      "/account/login",
      loginValidator,
      handleValidationErrors,
      async (req: Request, res: Response) => {
        try {
          const user = await UserModel.findOne({
            email: req.body.email,
          }).lean();
          if (!user) {
            return res.status(404).json({
              message: "User not found",
            });
          }
          const isValidPass = await bcrypt.compare(
            req.body.password,
            user.password_hash
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

          const { password_hash, _id, ...userData } = user;

          res.cookie("auth_token", authToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 3600000,
          });

          res.status(200).json({
            ...userData,
          });
        } catch (err) {
          console.log(err);
          res.status(500).json({
            message: "Failed to authenticate",
          });
        }
      }
    );

    // Logout
    this.router.post("/account/logout", async (req: Request, res: Response) => {
      try {
        res.clearCookie("auth_token");
        res.status(200).json();
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Failed to authenticate",
        });
      }
    });

    // Registration
    this.router.post(
      "/account/registration",
      registrationValidator,
      handleValidationErrors,
      async (req: Request, res: Response) => {
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

          const userObject = user.toObject();

          const authToken = jwt.sign(
            {
              _id: userObject._id,
            },
            process.env.SECRET_KEY,
            {
              expiresIn: "30d",
            }
          );

          res.cookie("auth_token", authToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 3600000,
          });

          const { password_hash, _id, ...userData } = userObject;

          res.status(200).json({
            ...userData,
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
          const newCart = new SharedCartModel({
            items: [],
            createdAt: new Date(),
          });

          const cart = await newCart.save();

          user.shared_carts.push(cart._id);

          await user.save();
        }

        const userObject = user.toObject();

        const { password_hash, _id, ...userData } = userObject;

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
