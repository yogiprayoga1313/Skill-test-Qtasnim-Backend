const transactionsModel = require("../models/transactions.model")
const productController = require('../contorllers/products.controller');

exports.getTransactions = async (request, response) => {
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

        const data = await transactionsModel.findAllTransactions(request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort,
            request.query.sortBy)
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

// exports.createTransaction = async (request, response) => {
//     try{
//         if(!request.product_id,
//             !request.qunatity_sold,
//             !request.body.date_transaction){
//             return response.status(404).json({
//                 success: false,
//                 message: "Product ID and Quantity Sold are required",
//                 results: null
//             })
//         }
//         const transactions = await transactionsModel.insert(request.body)

//         await updateProductStock(product_id, quantity_sold);

//         return response.json({
//             success: true,
//             message: "Create transactions success",
//             results: transactions
//         })
//     }catch(err){
//         console.log(err)
//         return response.status(500).json({
//             success: false,
//             message: "Internal server error",
//             results: null
//         });
//     }
// }

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

        // Update product stock
        try {
            const getProductQuery = `
                SELECT stock FROM product
                WHERE id = $1
            `;
            const getProductValues = [product_id];
            const product = await db.query(getProductQuery, getProductValues);

            if (product.rows.length > 0) {
                const currentStock = product.rows[0].stock;
                const updatedStock = currentStock - quantity_sold;

                // Update stok produk
                await productController.updateProductStock(product_id, updatedStock);
            }
        } catch (error) {
            console.log("Error updating product stock:", error);
        }

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