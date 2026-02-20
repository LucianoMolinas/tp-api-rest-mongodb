import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { newUser, getUser, validUser } from "../services/userService.js"
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES = process.env.JWT_EXPIRES

const register = async (req, res) => {
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
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: "Email ya existente en nuestra base de datos" })
    }
    res.status(500).json({ success: false, error: error.message })
  }
}

const login = async (req, res) => {
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

    // generar un token (cupón especial)
    // Un token es una llave digital o un fragmento de información que sirve para autenticar y autorizar a un usuario en sistemas digitales

    const payload = { _id: foundUser._id, username: foundUser.username, email: foundUser.email }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES })

    res.json({ success: true, data: token })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })

  }
}

export { register, login }