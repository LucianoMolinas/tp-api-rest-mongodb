"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//const JWT_SECRET = process.env.JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ success: false, error: "el token es requerido" });
    }
    if (!header.startsWith("Bearer")) {
        return res.status(401).json({ success: false, error: "el token debe ser formato jwt" });
    }
    const array = header.split(" ");
    const token = array[1];
    if (!token) {
        return res.status(401).json({ success: false, error: "token invalido" });
    }
    try {
        const verifyToken = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        next();
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.authMiddleware = authMiddleware;
