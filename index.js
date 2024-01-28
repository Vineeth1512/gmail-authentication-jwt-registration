const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const app = express();
const portNo = process.env.PORT
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/user', userRoutes);


app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Welcome to User Registration"
    })
})
app.listen(portNo, () => {
    console.log(`Server is running on ${portNo}`)
})

const MONGODB_URL = process.env.DATABASE_URL
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.error('MongoDB connection error:', err));


module.exports = app;//for vercel