const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const portfolioRoutes = require("./routes/portfolioRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth",authRoutes);
app.use("/api/portfolio",portfolioRoutes);  

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Connected");

    app.listen(process.env.PORT,()=>{
        console.log("Server running");
    });

})
.catch(err=>console.log(err));

