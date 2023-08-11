const transactionsModel = require("../models/transactions.model")
const productModel = require("../models/products.model")

const productController = require('../contorllers/products.controller');

exports.getTransactions = async (request, response) => {
    try { 
        const {page, limit, search, sort, sortBy} = request.query

        const data = await transactionsModel.findAllTransactions(page, limit, search, sort, sortBy)
        return response.json({
            success: true,
            message: "List off all Transactions",
            results: data
        })

    } 
    catch (error) {
        console.log(error)
    }
}


exports.createTransaction = async (request, response) => {
    try {
        const { product_id, quantity_sold } = request.body;

        if (!product_id || !quantity_sold || !request.body.date_transaction) {
            return response.status(400).json({
                success: false,
                message: "Product ID, Quantity Sold, and Date Transaction are required",
                results: null
            });
        }

        const transactions = await transactionsModel.insert(request.body);
        const stock = await productModel.findOne(product_id)
        const stokAwal = stock.quantity
        const stokTerjual = quantity_sold
        const stockAkhir = stokAwal - stokTerjual
        const updateDataStock = await productModel.updateStock(product_id, stockAkhir)
   
        return response.json({
            success: true,
            message: "Create transactions success",
            results: transactions
        });
    } catch (err) {
        console.log(err);
        return response.status(500).json({
            success: false,
            message: "Internal server error",
            results: null
        });
    }
}

async function updateProductStock(product_id, quantity_sold) {
    const getProductQuery = `
        SELECT stok FROM product
        WHERE id = $1
    `;
    const getProductValues = [product_id];

    const product = await db.query(getProductQuery, getProductValues);

    if (product.rows.length > 0) {
        const currentStock = product.rows[0].stock;
        const updatedStock = currentStock - quantity_sold;

        const updateStockQuery = `
            UPDATE product
            SET stok = $1
            WHERE id = $2
        `;
        const updateStockValues = [updatedStock, product_id];

        await db.query(updateStockQuery, updateStockValues);
    }
}

exports.deleteTransactions = async (request, response) => {
    try{
        const resultTransactions = await transactionsModel.findOne(request.params.id)
        if(!resultTransactions){
            return response.status(404).json({
                success: false,
                message: "Error : Data transactions not found",
                results: ""
            })
        }
        await transactionsModel.destroy(request.params.id)
        return response.json({
            success: true,
            message: "Delete transactions sucessfully",
            results : ""
        })
    }
    catch(err){
        console.log(err)
    }
}