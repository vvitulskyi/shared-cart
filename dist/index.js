import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { Account, ProductsList, SharedCart, } from "./api/v0/controllers/index.js";
import mongoose from "mongoose";
import http from "http";
import path from "path";
import { WebSocketServer } from "ws";
const allowedOrigins = [
    "https://shared-cart.azurewebsites.net",
    "http://localhost:5173",
    "http://localhost:4173",
    "http://localhost:9999",
    "http://localhost:8080",
    "http://localhost:3000",
];
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
const __dirname = path.resolve();
// Обслуживание статических файлов из React
app.use(express.static(path.join(__dirname, "client/dist")));
app.use(function (req, res, next) {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(baseApiUrl, accountApi.router);
app.use(baseApiUrl, productsListApi.router);
app.use(baseApiUrl, wsMiddleware, sharedCartApi.router);
// // Обработка любых других маршрутов, возвращая index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log("MongoDB not connected", err));
    console.log(`Server listening at ${PORT}`);
});
//# sourceMappingURL=index.js.map