import { Request, Response } from "express"
import { createCaterories, deleteCategory, getAllCategories, updateCategory } from "../services/categoryService"

const getCategory = async (req: Request, res: Response) => {
  try {
    const category = await getAllCategories()
    res.json({ success: true, data: category })
  } catch (error) {
    const err = error as Error
    res.status(500).json({ success: false, error: err.message })

  }
}

const createCategory = async (req: Request, res: Response) => {
  try {
    const body = req.body
    const { name, description } = body

    if (!name) {
      return res.status(400).json({ success: false, error: "Data invalida, vuelve a intentarlo" })
    }

    const createdCategory = await createCaterories(req.body)

    res.status(201).json({ success: true, data: createdCategory })
  } catch (error) {
    const err = error as Error
    res.status(500).json({ success: false, error: err.message })
  }
}

const updCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const updates = req.body

    const updatedCategory = await updateCategory(id, updates)


    if (!updatedCategory) {
      return res.status(404).json({ success: false, error: "no existe la categoria para actualizar" })
    }

    res.json({ success: true, data: updatedCategory })
  } catch (error) {
    const err = error as Error
    res.status(500).json({ success: false, error: err.message })
  }
}

const delCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const deletedCategory = await deleteCategory(id)
    if (!deletedCategory) {
      return res.status(404).json({ success: false, error: "no existe  la categoria que desea borrar" })
    }
    res.json({ success: true, data: deletedCategory })
  } catch (error) {
    const err = error as Error
    res.status(500).json({ success: false, error: err.message })
  }
}

export { getCategory, createCategory, updCategory, delCategory }