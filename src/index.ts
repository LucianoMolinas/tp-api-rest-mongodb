import express from "express"
import cors from "cors"
import { connectDb } from "./config/mongodb"
import { productRouter } from "./routes/productsRouter"
import { CategoryRouter } from "./routes/categoryRouter.js"
import { authRouter } from "./routes/authRouter.js"
import { authMiddleware } from "./middleware/authMiddleware.js"
import dotenv from "dotenv"

dotenv.config()

const serverHttp = express()


serverHttp.use(cors())
serverHttp.use(express.json())



serverHttp.use("/products", authMiddleware, productRouter)

serverHttp.use("/category", CategoryRouter)
serverHttp.use("/auth", authRouter)


serverHttp.use((req, res) => {
  res.status(404).json({ success: false, error: "el recurso no se encuentra" })
})

const PORT = process.env.PORT

serverHttp.listen(PORT, () => {
  try {
    console.log(`✅ Servidor http en escucha en el puerto http://127.0.0.1:${PORT}`)
    connectDb()
  } catch (error) {
    const err = error as Error
    console.log(err.message)
    process.exit(1)
  }
})