"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validUser = exports.getUser = exports.newUser = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const newUser = async (data) => {
    const { email, password, username } = data;
    const hash = await bcryptjs_1.default.hash(password, 10);
    const newDataUser = {
        email,
        password: hash,
        username
    };
    return await user_model_1.User.create(newDataUser);
};
exports.newUser = newUser;
const getUser = async (data) => {
    const { email } = data;
    return await user_model_1.User.findOne({ email });
};
exports.getUser = getUser;
const validUser = async (passwordbd, passwordlog) => {
    return await bcryptjs_1.default.compare(passwordbd, passwordlog);
};
exports.validUser = validUser;
