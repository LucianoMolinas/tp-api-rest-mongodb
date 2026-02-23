"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("./config/mongodb");
const productsRouter_1 = require("./routes/productsRouter");
const categoryRouter_1 = require("./routes/categoryRouter");
const authRouter_1 = require("./routes/authRouter");
const authMiddleware_1 = require("./middleware/authMiddleware");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const serverHttp = (0, express_1.default)();
serverHttp.use((0, cors_1.default)());
serverHttp.use(express_1.default.json());
serverHttp.use("/products", authMiddleware_1.authMiddleware, productsRouter_1.productRouter);
serverHttp.use("/category", categoryRouter_1.CategoryRouter);
serverHttp.use("/auth", authRouter_1.authRouter);
serverHttp.use((req, res) => {
    res.status(404).json({ success: false, error: "el recurso no se encuentra" });
});
const PORT = process.env.PORT;
serverHttp.listen(PORT, () => {
    try {
        console.log(`✅ Servidor http en escucha en el puerto http://127.0.0.1:${PORT}`);
        (0, mongodb_1.connectDb)();
    }
    catch (error) {
        const err = error;
        console.log(err.message);
        process.exit(1);
    }
});
