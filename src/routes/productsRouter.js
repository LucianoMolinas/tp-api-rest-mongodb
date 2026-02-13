import { Router } from "express"
import { crtProduct, delProduct, getProducts, updProduct } from "../controllers/product.controller.js"

const productRouter = Router()

// GET - http://localhost:3000/products/

productRouter.get("/", getProducts)
productRouter.post("/", crtProduct)
productRouter.patch("/:id", updProduct)
productRouter.delete("/:id", delProduct)

export { productRouter }