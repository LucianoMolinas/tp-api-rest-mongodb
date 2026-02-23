import { Request, Response, NextFunction } from "express"
import jwt, { Secret } from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

//const JWT_SECRET = process.env.JWT_SECRET

const JWT_SECRET: Secret = process.env.JWT_SECRET as string;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization

  if (!header) {
    return res.status(401).json({ success: false, error: "el token es requerido" })
  }

  if (!header.startsWith("Bearer")) {
    return res.status(401).json({ success: false, error: "el token debe ser formato jwt" })
  }

  const array = header.split(" ")

  const token = array[1]


  if (!token) {
    return res.status(401).json({ success: false, error: "token invalido" })
  }

  try {
    const verifyToken = jwt.verify(token, JWT_SECRET)
    next()
  } catch (error) {
    const err = error as Error
    res.status(500).json({ success: false, error: err.message })
  }
}

export { authMiddleware }