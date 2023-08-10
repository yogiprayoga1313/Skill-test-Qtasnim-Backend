const type_productsRouter = require("express").Router()

const type_productsControllers = require("../contorllers/type_products.controller")

type_productsRouter.get("/", type_productsControllers.getType_products)
type_productsRouter.post("/", type_productsControllers.createType_products)
type_productsRouter.patch("/:id", type_productsControllers.updateType_product)
type_productsRouter.delete("/:id", type_productsControllers.deleteType_poducts)

module.exports = type_productsRouter