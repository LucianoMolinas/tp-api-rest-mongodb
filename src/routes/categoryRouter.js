import { Router } from "express"
import { getCategory, createCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js"

const CategoryRouter = Router()

// GET - http://localhost:3000/products/

CategoryRouter.get("/", getCategory)
CategoryRouter.post("/", createCategory)
CategoryRouter.patch("/:id", updateCategory)
CategoryRouter.delete("/:id", deleteCategory)

export { CategoryRouter }