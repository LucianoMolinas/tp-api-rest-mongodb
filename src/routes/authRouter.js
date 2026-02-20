import { Router } from "express"
import { login, register } from "../controllers/user.Controller.js"

const authRouter = Router()

// petición de registrar usuario
authRouter.post("/register", register)

// petición de logear usuario
authRouter.post("/login", login)

export { authRouter }