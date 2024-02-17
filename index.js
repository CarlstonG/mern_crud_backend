const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const UserModel = require('./models/User')

const app = express()
app.use(cors({
    origin: 'https://mern-frontend-crud.onrender.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}))
app.use(express.json())

// connecting MongoDB
mongoose.connect(process.env.MONGODB_URI)

// display all users
app.get("/", (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
    
})
// get id display user
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
    
})
// update user
app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id
    UserModel.findByIdAndUpdate({_id: id}, {
        name: req.body.name, 
        email: req.body.email, 
        age: req.body.age})
        .then(users => res.json(users))
        .catch(err => res.json(err))
          
})
// createuser
app.post("/createUser", (req, res) => {
    UserModel.create(
        req.body).then(users => res.json(users))
                 .catch(err => res.json(err))
})

app.delete("/deleteUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

const port = process.env.PORT || 3002

app.listen(port, () => {
    console.log("server is running " +port)
})