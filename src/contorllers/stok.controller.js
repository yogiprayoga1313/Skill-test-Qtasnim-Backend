const StokModel = require("../models/stok.model")

exports.getStok = async (request, response) => {
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

        const data = await StokModel.findAllStok(request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.sort,
            request.query.sortBy)
        return response.json({
            success: true,
            message: "List off all Stok",
            results: data
        })

    } 
    catch (error) {
        console.log(error)
    }
}


exports.createStok = async (request, response) => {
    try{
        if(!request.product_id,
            !request.body.quantity){
            return response.status(404).json({
                success: false,
                message: "Data cannot be empty!",
                results: ""
            })
        }
        const stok = await StokModel.insert(request.body)
        return response.json({
            success: true,
            message: "Create stok success",
            results: stok
        })
    }catch(err){
        console.log(err)
    }
}

exports.getOneStok = async (request, response) => {
    try {
        if(isNaN(request.params.id) && parseInt(request.params.id) !== request.params.id){
            return response.status(400).json({
                success:false,
                message: "Parameter id must be number!"
            })
        }
        const data = await StokModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: "Detail stok",
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


exports.deleteStok = async (request, response) => {
    try{
        const resultStok = await StokModel.findOne(request.params.id)
        if(!resultStok){
            return response.status(404).json({
                success: false,
                message: "Error : Data stok not found",
                results: ""
            })
        }
        await StokModel.destroy(request.params.id)
        return response.json({
            success: true,
            message: "Delete stok sucessfully",
            results : ""
        })
    }
    catch(err){
        console.log(err)
    }
}

exports.updateStok = async (request, response) => {
    try{
        if(!request.params.id || isNaN(request.params.id)){
            throw Error("id_empty")
        }
        const resultUpdate = await StokModel.update(request.params.id, request.body)
        if(resultUpdate){
            return response.json({
                success: true,
                message: "Update Stok sucessfully",
                results: resultUpdate
            })
        }
        else{
            return response.status(404).json({
                success: false,
                message: "Error : Data not found",
                results: ""
            })
        }
    }
    catch(err){
        return errorHandler(response, err)
    }
}