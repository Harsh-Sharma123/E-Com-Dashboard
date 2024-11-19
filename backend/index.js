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

app.listen(5000);
