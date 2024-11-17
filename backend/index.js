const express = require("express");

const mongoose = require("mongoose");

const app = express();

const connectDB = async () => {
    mongoose.connect("mongodb://localhost:27017/db")

    // schema
    const productSchema = new mongoose.Schema({});

    // model
    const product = mongoose.model('product', productSchema);
    const data = await product.find();
    console.log(data);
}

app.get("/", (req, res) => {
    res.send("App is Working !!");
})

app.listen(5000);