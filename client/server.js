const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config()
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

// MongoDB Connect
mongoose.connect(process.env.MongoDB_URL)
    .then(() => console.log('Database is connected'))
    .catch((error) => console.log(error))

// Route
const userRoutes = require('./Routes/userRoutes')
app.use('/api/v1/user',  userRoutes)
app.use("/api/v1/admin", require("./Routes/adminRoutes"));

// static file
app.use(express.static(path.join(__dirname, "./client/build")))

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

// server running
const port = process.env.port || 5000
app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})