import { Router } from "express"
import { getCategory, createCategory, updCategory, delCategory } from "../controllers/category.controller"

const CategoryRouter = Router()


CategoryRouter.get("/", getCategory)
CategoryRouter.post("/", createCategory)
CategoryRouter.patch("/:id", updCategory)
CategoryRouter.delete("/:id", delCategory)

export { CategoryRouter }