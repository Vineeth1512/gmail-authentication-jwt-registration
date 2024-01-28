const express =require("express");
const mongoose =require("mongoose");
require('dotenv').config();
const cors =require("cors");
const userRoutes =require("./routes/user.route");
const app = express();
const portNo = process.env.PORT
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/user',userRoutes);


app.get("/",(req,res)=>{
    return res.status(200).json({
        message:"Welcome to User Registration"
    })
})
const MONGODB_URL =process.env.DATABASE_URL
mongoose.connect(MONGODB_URL).then(() => {
    console.log("MongoDB is connected");

    app.listen(portNo, () => {
        console.log(`Server is running on ${portNo}`)
    })
})

module.exports =app;//for vercel