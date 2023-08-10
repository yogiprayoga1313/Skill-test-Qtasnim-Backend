const type_productsModel = require("../models/type_products.model")

exports.getType_products = async (request, response) => {
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

        const data = await type_productsModel.findAllType_Products(request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort,
            request.query.sortBy)
        return response.json({
            success: true,
            message: "List off all Products Type",
            results: data
        })

    } 
    catch (error) {
        console.log(error)
    }
}

exports.createType_products = async (request, response) => {
    try{
        if(!request.body.name_type_product){
            return response.status(404).json({
                success: false,
                message: "Data cannot be empty!",
                results: ""
            })
        }
        const categories = await type_productsModel.insert(request.body)
        return response.json({
            success: true,
            message: "Create products success",
            results: categories
        })
    }catch(err){
        console.log(err)
    }
}

exports.deleteType_poducts = async (request, response) => {
    try{
        const resultsType_products = await type_productsModel.findOne(request.params.id)
        if(!resultsType_products){
            return response.status(404).json({
                success: false,
                message: "Error : Data product type not found",
                results: ""
            })
        }
        await type_productsModel.destroy(request.params.id)
        return response.json({
            success: true,
            message: "Delete product type sucessfully",
            results : ""
        })
    }
    catch(err){
        console.log(err)
    }
}