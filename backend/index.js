const express = require("express");

const cors = require("cors");

require("./db/config.js");

const User = require("./db/User.js");
const Product = require("./db/Product.js");

const app = express();

app.get("/", (req, res) => {
    res.send("App is working on port 5000!");
});

// middlewares

app.use(express.json()); // middleware to parse the incoming json data in the req body into js objects 
app.use(cors()); // middleware to allow communication between applications

// post req to register users
app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
});

app.post("/login", async (req, res) => {
    // res.send("Login Page");
    let user = await User.findOne(req.body).select("-password");
    if(user){
        res.send(user);
    }else{
        res.send({result: "No User Found"})
    }
})

app.post("/addProduct", async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save(); 
    res.send(result);   
})

app.get("/products", async (req, res) => {
    let products = await Product.find();
    if(products.length > 0){
        res.send(products);
    }else{
        res.send("No Products Found");
    }
})

app.delete("/product/:id", async (req, res) => {

    let result = await Product.deleteOne({_id: req.params.id});
    res.send(result);
})

app.get("/product/:id", async (req, res) => {
    let result = await Product.findOne({_id: req.params.id});
    if(result){
        res.send(result);
    }else{
        res.send("No Product Found !!");
    }
})

app.put("/product/:id", async (req, res) => {
    let result = await Product.updateOne({_id: req.params.id},{
        $set: req.body
    })
    res.send(result);
})

app.get("/search/:key", async (req, res) => {
   let result = await Product.find({
    "$or": [
        { name: { $regex: req.params.key }},
        // { company: { $regex: req.params.key }},
        // { category: { $regex: req.params.key }},
        // { price: { $regex: req.params.key }}
    ]
   })
   res.send(result)
})
app.listen(5000);
