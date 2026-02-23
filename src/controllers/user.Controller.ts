
import { Request, Response } from "express"
import jwt, { Secret } from "jsonwebtoken"
import dotenv from "dotenv"
import { newUser, getUser, validUser } from "../services/userService"
dotenv.config()

const JWT_SECRET: Secret = process.env.JWT_SECRET as string;


const register = async (req: Request, res: Response) => {
  try {
    const body = req.body

    const { email, password, username } = body

    if (!email || !password || !username) {
      return res.status(400).json({ success: false, error: "data invalida, revisa los datos compartidos" })
    }

    if (!email.includes("@") || !email.endsWith(".com")) {
      return res.status(400).json({ success: false, error: "el correo electronico debería ser un email valido" })
    }

    if (password.length < 4) {
      return res.status(400).json({ success: false, error: "la contraseña debe contar al menos con 5 caracteres" })
    }

    const newUser1 = await newUser(body)


    res.status(201).json({
      success: true, data: {
        _id: newUser1._id,
        username: newUser1.username,
        email: newUser1.email
      }
    })
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: "Email ya existente en nuestra base de datos" })
    }
    const err = error as Error

    return res.status(500).json({
      success: false,
      error: err.message
    })
  }
}
const login = async (req: Request, res: Response) => {
  try {
    const body = req.body
    const { email, password } = body

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "data invalida, ingrese los datos requeridos" })
    }
    const foundUser = await getUser(body)


    if (!foundUser) {
      return res.status(401).json({ success: false, error: "desautorizado" })
    }

    const validatePassword = await validUser(password, foundUser.password)

    if (!validatePassword) {
      return res.status(401).json({ succes: false, error: "desautorizado" })
    }




    const payload = { _id: foundUser._id, username: foundUser.username, email: foundUser.email }


    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "10h" })

    res.json({ success: true, data: token })
  } catch (error) {
    const err = error as Error
    res.status(500).json({ success: false, error: err.message })
  }
}

export { register, login }
