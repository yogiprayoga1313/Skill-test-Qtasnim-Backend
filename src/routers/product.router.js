const productsRouter = require("express").Router()

const productControllers = require("../contorllers/products.controller")

productsRouter.get("/", productControllers.getProducts)
// productsRouter.get("/:id", productControllers.getOneProduct)
productsRouter.post("/", productControllers.createProducts)
productsRouter.delete("/:id", productControllers.deleteProducts)

module.exports = productsRouter