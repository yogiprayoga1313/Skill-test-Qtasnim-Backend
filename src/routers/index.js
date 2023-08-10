const router = require("express").Router()

router.get("/", (request, response) =>{
    return response.json({
        success: true,
        message:"Backend is running well"
    })
})

router.use("/products", require("./product.router"))
router.use("/stok", require("./stok.router"))
router.use("/transactions", require("./transactions.router"))
router.use("/type_products", require("./type_products.router"))

router.use("*", (request, response) => {
    return response.status(404).json({
        success: false,
        message: "Resource not found"
    })
})

module.exports = router