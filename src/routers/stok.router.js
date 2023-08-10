const stokRouter = require("express").Router()

const stokController = require("../contorllers/stok.controller")

stokRouter.get("/", stokController.getStok)
stokRouter.get("/:id", stokController.getOneStok)
stokRouter.post("/", stokController.createStok)
stokRouter.delete("/:id", stokController.deleteStok)

module.exports = stokRouter