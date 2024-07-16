import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import {
  Account,
  ProductsList,
  SharedCart,
} from "./api/v0/controllers/index.js";
import mongoose from "mongoose";
import http from "http";
import { WebSocketServer } from "ws";

const accountApi = new Account();
const productsListApi = new ProductsList();
const sharedCartApi = new SharedCart();

function wsMiddleware(req, res, next) {
  req.wss = wss;
  next();
}

const baseApiUrl = "/api/v1";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(baseApiUrl, accountApi.router);
app.use(baseApiUrl, productsListApi.router);
app.use(baseApiUrl, wsMiddleware, sharedCartApi.router);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

server.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB not connected", err));
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
