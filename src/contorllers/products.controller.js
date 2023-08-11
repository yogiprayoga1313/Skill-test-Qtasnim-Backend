const productModel = require("../models/products.model")
const stockModel = require("../models/stok.model")

exports.getProducts = async (request, response) => {
    try { 
        const {page, limit, search, sort, sortBy} = request.query

        const data = await productModel.findAllProducts(page, limit, search, sort, sortBy)
        const countProduct = await productModel.countProduct(page, limit, search, sort, sortBy)
        const totalPage = Math.ceil(parseInt(countProduct.totalData)/parseInt(limit || 5))
        return response.json({
            success: true,
            message: "List off all products",
            results: data,
            totalPage : totalPage
        })
    } 
    catch (error) {
        console.log(error)
    }
}

exports.getOneProduct = async (request, response) => {
    try {
        if(isNaN(request.params.id) && parseInt(request.params.id) !== request.params.id){
            return response.status(400).json({
                success:false,
                message: "Parameter id must be number!"
            })
        }
        const data = await productModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: "Detail product",
                results: data
            })
        }
        else{
            return response.status(404).json({
                success: false,
                message: "Error : Data not found",
                results: data
            })
        }
  
    } catch (error) {
        console.log(error)
  
    }
  
}

exports.createProducts = async (request, response) => {
    // return console.log(request.body)
    try{
        if(!request.body.name_product,
            !request.body.type_id,
            !request.body.quantity){
            return response.status(404).json({
                success: false,
                message: "Data cannot be empty!"
            })
        }
        const product = await productModel.insert(request.body)
        const dataStock = {
            product_id : product.id,
            quantity : request.body.quantity
        }
        const stok = await stockModel.insert(dataStock)
        const results = {...product, stock : stok.quantity}
        return response.json({
            success: true,
            message: "Create products success",
            results: results
        })
    }catch(err){
        console.log(err)
    }
}

exports.deleteProducts = async (request, response) => {
    try{
        const resultsProduct = await productModel.findOne(request.params.id)
        if(!resultsProduct){
            return response.status(404).json({
                success: false,
                message: "Error : Data products not found",
                results: ""
            })
        }
        await productModel.destroy(request.params.id)
        await stockModel.destroyByProductId(request.params.id)

        return response.json({
            success: true,
            message: "Delete products sucessfully",
            results : ""
        })
    }
    catch(err){
        console.log(err)
    }
}

exports.updateProductStock = async ({ product_id, quantity_change }) => {
    try {
        const getProductQuery = `
            SELECT stock FROM product
            WHERE id = $1
        `;
        const getProductValues = [product_id];

        const product = await db.query(getProductQuery, getProductValues);

        if (product.rows.length > 0) {
            const currentStock = product.rows[0].stock;
            const updatedStock = currentStock + quantity_change;

            // Pastikan stok tidak negatif
            const newStock = Math.max(updatedStock, 0);

            // Update stok produk
            return productModel.updateStock(product_id, newStock);
        }
    } catch (error) {
        throw error;
    }
}