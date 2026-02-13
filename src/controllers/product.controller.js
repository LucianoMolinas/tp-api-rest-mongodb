
//import * as  productService from "../services/productService.js"

import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../services/productService.js"
import { Product } from "../models/product.model.js"

const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts()
    res.json({ success: true, data: products })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: error.message })
  }
}

const crtProduct = async (req, res) => {
  try {
    const body = req.body
    const { name, price, stock, category, description } = body

    if (!name) {
      return res.status(400).json({ success: false, error: "Data invalida, vuelve a intentarlo" })
    }
    const createdProduct = await createProduct(req.body)

    res.status(201).json({ success: true, data: createdProduct })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

const updProduct = async (req, res) => {
  try {
    const id = req.params.id
    const updates = req.body

    const updatedProduct = await updateProduct(id, updates)

    if (!updatedProduct) {
      return res.status(404).json({ success: false, error: "no existe el producto para actualizar" })
    }
    else {
      res.json({ success: true, data: updatedProduct })
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

const delProduct = async (req, res) => {
  try {
    const id = req.params.id

    const deletedProduct = await deleteProduct(id)

    if (!deletedProduct) {
      return res.status(404).json({ success: false, error: "no existe el producto para borrar" })
    }
    res.status(200).json({ success: true, data: deletedProduct })
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, error: "ID incorrecto, ingresa un valor valido" })
    }
    res.status(500).json({ success: false, error: error.message })
  }
}

export { getProducts, crtProduct, updProduct, delProduct }