const express = require("express");

const cors = require("cors");

require("./db/config.js");

const User = require("./db/User.js");
const Product = require("./db/Product.js");

const app = express();

const jwt = require("jsonwebtoken");
const jwtKey = "E-Comm";

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
    if(result){
        jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
            if(err){
                res.send({ result: "Something went wrong, please try again later !"});
            }else{
                res.send({ user, auth: token });
            }
        })
    }
    // delete result.password;
    // res.send(result);
});

app.post("/login", async (req, res) => {
    // res.send("Login Page");
    let user = await User.findOne(req.body).select("-password");
    if(user){
        jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
            if(err){
                res.send({ result: "Something went wrong, please try again later !"});
            }else{
                res.send({ user , auth: token});
            }
        })
    }else{
        res.send({result: "No User Found"})
    }
})

app.get("/users", async (req, res) => {
    let users = await User.find();
    if(users.length > 0){
        res.send(users);
    }else{
        res.status(401).send("No User Found!");
    }
})

app.post("/addProduct", verifyJWT, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save(); 
    res.send(result);   
})

app.get("/products", verifyJWT, async (req, res) => {
    let products = await Product.find();
    if(products.length > 0){
        res.send(products);
    }else{
        res.send("No Products Found");
    }
})

app.delete("/product/:id", verifyJWT, async (req, res) => {

    let result = await Product.deleteOne({_id: req.params.id});
    res.send(result);
})

app.get("/product/:id", verifyJWT, async (req, res) => {
    let result = await Product.findOne({_id: req.params.id});
    if(result){
        res.send(result);
    }else{
        res.send("No Product Found !!");
    }
})

app.put("/product/:id", verifyJWT, async (req, res) => {
    let result = await Product.updateOne({_id: req.params.id},{
        $set: req.body
    })
    res.send(result);
})

app.get("/search/:key", verifyJWT, async (req, res) => {
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

// middleware to verify jwt token

function verifyJWT(req, res, next){
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        // console.log(token);
        jwt.verify(token, jwtKey, (err, valid) => {
            if(err){
                res.status(401).send({ result: "Please provide valid token !" });
            }else{
                next();
            }
        })
    }else{
        res.status(403).send({ result: "Please add token in Headers!"})
    }
    // next();
}
