require("dotenv").config({
    path: ".env"
})

const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.urlencoded({extended: false}))

app.use("/uploads", express.static("upload"))
// app.use(cors({
//     origin:"http://localhost:5173" || process.env.FRONTEND_URL,
//     optionsSuccessStatus: 200
// }))
app.use(cors())

app.use("/", require("./src/routers/index"))

app.get("/", (request, response) =>{
    return response.json({
        success: true,
        message:"Backend is running well"
    })
})
const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`App running on port ${PORT}`)
})

