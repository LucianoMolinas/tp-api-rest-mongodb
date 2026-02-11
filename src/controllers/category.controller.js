import { Category } from "../models/category.model.js"

const getCategory = async (req, res) => {
  try {
    const category = await Category.find().sort({ _id: -1 })
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

    const createdCategory = await Category.create({ name, description })

    res.status(201).json({ success: true, data: createdCategory })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

const updateCategory = async (req, res) => {
  try {
    const id = req.params.id
    const updates = req.body

    const updatedCategory = await Category.findByIdAndUpdate(id, updates, { new: true })

    if (!updatedCategory) {
      return res.status(404).json({ success: false, error: "no existe la categoria para actualizar" })
    }

    res.json({ success: true, data: updatedCategory })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id
    const deletedCategory = await Category.findByIdAndDelete(id)
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

export { getCategory, createCategory, updateCategory, deleteCategory }