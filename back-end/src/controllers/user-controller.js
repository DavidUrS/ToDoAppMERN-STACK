const User = require('./../models/user-model');
const mongoose = require('mongoose');
const userController = {};

userController.createUser = (req,res)=>{
    const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        lastname: req.body.lastname
    }) 
    newUser.save((err,user)=>{
        if(err){
            let response = {
                message: `An error occurred creating the new user. ${err}`,
                type:'danger'
            }
            res.status(500).json(response);
        }else{
            let response = {
                message: `The new user was created successfully.`,
                type:'success'
            }
            res.status(201).json(response)
        }
    })
}

userController.getUsers = (req,res)=>{
    User.find((err,users)=>{
        if(err){
            let response = {
                message: `An error occurred when consulting the users ${err}`,
                type:'danger'
            }
            res.status(500).json(response);
        }else{
            let response = {
                message: users,
                type:'success'
            }
            res.status(201).json(response);
        }
    })
}

module.exports = userController;