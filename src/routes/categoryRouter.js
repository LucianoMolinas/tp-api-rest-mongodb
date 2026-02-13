import { Router } from "express"
import { getCategory, createCategory, updCategory, delCategory } from "../controllers/category.controller.js"

const CategoryRouter = Router()

// GET - http://localhost:3000/products/

CategoryRouter.get("/", getCategory)
CategoryRouter.post("/", createCategory)
CategoryRouter.patch("/:id", updCategory)
CategoryRouter.delete("/:id", delCategory)

export { CategoryRouter }