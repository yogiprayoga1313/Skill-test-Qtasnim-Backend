const productModel = require("../models/products.model")

exports.getProducts = async (request, response) => {
    console.log(request.query)
    try { 
        const sortWhaitlist = ["name"]
        if(request.query.sort && !sortWhaitlist.includes(request.query.sort)){
            return response.status(400).json({
                success: false,
                message:`Please choose one of the following sorting options: ${sortWhaitlist.join(",")}`
            })
        }

        const sortByWhaitlist = ["asc", "desc"]
        if(request.query.sortBy && !sortByWhaitlist.includes(request.query.sortBy.toLowerCase())){
            return response.status(400).json({
                success: false,
                message:`Please choose one of the following sorting options:  ${sortByWhaitlist.join(",")}`
            })
        }

        const data = await productModel.findAllProducts(request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort,
            request.query.sortBy)
        return response.json({
            success: true,
            message: "List off all products",
            results: data
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
    try{
        if(!request.body.name_product,
            !request.body.type_id){
            return response.status(404).json({
                success: false,
                message: "Data cannot be empty!",
                results: ""
            })
        }
        const product = await productModel.insert(request.body)
        return response.json({
            success: true,
            message: "Create products success",
            results: product
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