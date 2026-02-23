
import { Request, Response } from "express"
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../services/productService"


const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts()
    res.json({ success: true, data: products })
  } catch (error) {
    const err = error as Error
    res.status(500).json({ success: false, error: err.message })

  }
}

const crtProduct = async (req: Request, res: Response) => {
  try {
    const body = req.body
    const { name, price, stock, category, description } = body

    if (!name) {
      return res.status(400).json({ success: false, error: "Data invalida, vuelve a intentarlo" })
    }
    const createdProduct = await createProduct(req.body)

    res.status(201).json({ success: true, data: createdProduct })
  } catch (error) {
    const err = error as Error
    res.status(500).json({ success: false, error: err.message })
  }
}

const updProduct = async (req: Request<{ id: string }>, res: Response) => {
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
    const err = error as Error
    res.status(500).json({ success: false, error: err.message })
  }
}

const delProduct = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id

    const deletedProduct = await deleteProduct(id)

    if (!deletedProduct) {
      return res.status(404).json({ success: false, error: "no existe el producto para borrar" })
    }
    res.status(200).json({ success: true, data: deletedProduct })
  } catch (error) {
    const err = error as Error
    res.status(500).json({ success: false, error: err.message })
  }
}

export { getProducts, crtProduct, updProduct, delProduct }