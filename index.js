//connect env file
require("dotenv").config()

//import router
const router = require("./routes/router")

const express = require("express")
const cors = require('cors')
//import db connection file
require("./database/connections")

const server = express()

server.use(cors())
//to convert json data to javascript
server.use(express.json())
//using router
server.use(router)

//for connecting env file in the same port use {process.env.port} method
const port = 4001 || process.env.port

//export uploads folder to client
server.use("/uploads", express.static("./uploads"))

server.listen(port, () => {
    console.log(`_____EMS SERVER STARTED AT PORT NUMBER ${port}_____`);
})

