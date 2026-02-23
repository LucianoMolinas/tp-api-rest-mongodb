"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const userService_1 = require("../services/userService");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const register = async (req, res) => {
    try {
        const body = req.body;
        const { email, password, username } = body;
        if (!email || !password || !username) {
            return res.status(400).json({ success: false, error: "data invalida, revisa los datos compartidos" });
        }
        if (!email.includes("@") || !email.endsWith(".com")) {
            return res.status(400).json({ success: false, error: "el correo electronico debería ser un email valido" });
        }
        if (password.length < 4) {
            return res.status(400).json({ success: false, error: "la contraseña debe contar al menos con 5 caracteres" });
        }
        const newUser1 = await (0, userService_1.newUser)(body);
        res.status(201).json({
            success: true, data: {
                _id: newUser1._id,
                username: newUser1.username,
                email: newUser1.email
            }
        });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, error: "Email ya existente en nuestra base de datos" });
        }
        const err = error;
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const body = req.body;
        const { email, password } = body;
        if (!email || !password) {
            return res.status(400).json({ success: false, error: "data invalida, ingrese los datos requeridos" });
        }
        const foundUser = await (0, userService_1.getUser)(body);
        if (!foundUser) {
            return res.status(401).json({ success: false, error: "desautorizado" });
        }
        const validatePassword = await (0, userService_1.validUser)(password, foundUser.password);
        if (!validatePassword) {
            return res.status(401).json({ succes: false, error: "desautorizado" });
        }
        const payload = { _id: foundUser._id, username: foundUser.username, email: foundUser.email };
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "10h" });
        res.json({ success: true, data: token });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.login = login;
