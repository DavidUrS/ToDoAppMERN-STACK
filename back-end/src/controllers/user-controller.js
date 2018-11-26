const User = require('./../models/user-model');
const mongoose = require('mongoose');
const userController = {};

userController.deleteUser = (req,res)=>{
    User.findByIdAndRemove(req.params.id, (err,user)=>{
        if(err){
            let response = {
                message: `An error occurred while removing the user. ${err}`,
                type:'danger'
            }
            res.status(500).json(response);
        }else{
            let response = {
                message: `The user was deleted correctly.`,
                type:'success'
            }
            res.status(201).json(response)
        }
    })
}

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

userController.editUser = (req,res)=>{
    const editUser =  new User({
        _id: req.params.id,
        name: req.body.name,
        lastname: req.body.lastname
    })
    User.findByIdAndUpdate(req.params.id,{$set:editUser},(err,user)=>{
        if(err){
            let response = {
                message: `An error occurred updating the user. ${err}`,
                type:'danger'
            }
            res.status(500).json(response);
        }else{
            let response = {
                message: `The user was updated successfully.`,
                type:'success'
            }
            res.status(201).json(response)
        }
    })
}

userController.findById = (req,res)=>{
    User.findById(req.params.id,(err,user)=>{
        if(err){
            let response = {
                message: `An error occurred when consulting the user ${err}`,
                type:'danger'
            }
            res.status(500).json(response);
        }else{
            let response = {
                message: user,
                type: 'success'
            }
            res.status(201).json(response);
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