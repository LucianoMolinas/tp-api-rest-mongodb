"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const user_Controller_1 = require("../controllers/user.Controller");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
// petición de registrar usuario
authRouter.post("/register", user_Controller_1.register);
// petición de logear usuario
authRouter.post("/login", user_Controller_1.login);
