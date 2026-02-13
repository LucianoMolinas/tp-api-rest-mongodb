import { createCaterories, deleteCategory, getAllCategories, updateCategory } from "../services/categoryService.js"

const getCategory = async (req, res) => {
  try {
    const category = await getAllCategories()
    res.json({ success: true, data: category })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: error.message })
  }
}

const createCategory = async (req, res) => {
  try {
    const body = req.body
    const { name, description } = body

    if (!name) {
      return res.status(400).json({ success: false, error: "Data invalida, vuelve a intentarlo" })
    }

    const createdCategory = await createCaterories(req.body)

    res.status(201).json({ success: true, data: createdCategory })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

const updCategory = async (req, res) => {
  try {
    const id = req.params.id
    const updates = req.body

    const updatedCategory = await updateCategory(id, updates)


    if (!updatedCategory) {
      return res.status(404).json({ success: false, error: "no existe la categoria para actualizar" })
    }

    res.json({ success: true, data: updatedCategory })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

const delCategory = async (req, res) => {
  try {
    const id = req.params.id
    const deletedCategory = await deleteCategory(id)
    if (!deletedCategory) {
      return res.status(404).json({ success: false, error: "no existe  la categoria que desea borrar" })
    }
    res.json({ success: true, data: deletedCategory })
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, error: "ID incorrecto, ingresa un valor valido" })
    }
    res.status(500).json({ success: false, error: error.message })
  }
}

export { getCategory, createCategory, updCategory, delCategory }