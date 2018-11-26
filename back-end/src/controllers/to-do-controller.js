const doModel = require('./../models/to-do-model');
const User = require('./../models/user-model');
const mongoose = require('mongoose');
const toDoController = {}
const validator = require('../middlewares/task-validation');


toDoController.getStatus = (req,res)=>{
    let response = {
        message:doModel.schema.path('status').enumValues,
        type:'success'
    }
    res.status(201).json(response);
}

toDoController.getToDos = (req,res)=>{
    doModel.find().populate('userVirtual').exec((err,toDos)=>{
        if(err){
            let response = {
                message: `An error occurred when consulting the to dos ${err}`,
                type:'danger'
            }
            res.status(500).json(response);
        }else{
            let response = {
                message: toDos,
                type:'success'
            }
            res.status(201).json(response);
        }
    })
}

toDoController.getToDoByName = (req,res)=>{
    const errors = validator.validatorErrors(req);
    if (errors.length>0) {
        let listErrors = '';
        errors.forEach((err, index, errors)=>{
            listErrors += 'Error n°'+(index+1)+': '+err.msg+". "
        })
        let response = {
            message: listErrors,
            type:'danger'
        }
        return res.json(response)
    }else{
        doModel.find({title:req.body.title},(err,toDos)=>{
            if(err){
                let response = {
                    message: `An error occurred when consulting the to dos ${err}`,
                    type:'danger'
                }
                res.status(500).json(response);
            }else{
                if(toDos){
                    let response = {
                        message: toDos,
                        type:'success'
                    }
                    res.status(201).json(response);
                }
            }
        })
    }
    
}

toDoController.getToDosByStatus = (req,res)=>{
    if(req.params.status=='All'){
        doModel.find().populate('userVirtual').exec((err,tasks)=>{
            if(err){
                let response = {
                    message: `An error occurred when consulting the to dos ${err}`,
                    type:'danger'
                }
                res.status(500).json(response);
            }if(tasks){
                let response = {
                    message: tasks,
                    type: 'success'
                }
                res.status(201).json(response)
            }
        })
    }else{
        doModel.find({status:req.params.status}).populate('userVirtual').exec((err,toDos)=>{
            if(err){
                let response = {
                    message: `An error occurred when consulting the to dos ${err}`,
                    type:'danger'
                }
                res.status(500).json(response);
            }else{
                let response = {
                    message: toDos,
                    type:'success'
                }
                res.status(201).json(response);
            }
        })
    }
}

toDoController.getToDoById = (req,res)=>{
    doModel.findById(req.params.id,(err,toDo)=>{
        if(err){
            let response = {
                message: `An error occurred when consulting the to do ${err}`,
                type:'danger'
            }
            res.status(500).json(response);
        }else{
            if(toDo){
                let response = {
                    message: toDo,
                    type:'success'
                }
                res.status(201).json(response);
            }
            else{
                let response = {
                    message: `The to do is not found in the database`,
                    type:'danger'
                }
                res.status(500).json(response);
            }
        }
    })
}

toDoController.createToDo = (req,res)=>{
    const errors = validator.validatorErrors(req);
    if (errors.length>0) {
        let listErrors = '';
        errors.forEach((err, index, errors)=>{
            listErrors += 'Error n°'+(index+1)+': '+err.msg+". "
        })
        let response = {
            message: listErrors,
            type:'danger'
        }
        return res.json(response)
    }else{
        const newToDo = new doModel({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            status: req.body.status
        })
        newToDo.save((err,toDoAdd)=>{
            if(err){
                let response = {
                    message: `An error occurred creating the new to do. ${err}`,
                    type:'danger'
                }
                res.status(500).json(response);
            }else{
                let response = {
                    message: `The new to do was created successfully.`,
                    type:'success'
                }
                res.status(201).json(response)
            }
        })
    }
}

toDoController.deleteTodo = (req,res)=>{
    doModel.findByIdAndRemove(req.params.id,(err,toDo)=>{
        if(err){
            let response = {
                message: `An error occurred while removing the to do. ${err}`,
                type:'danger'
            }
            res.status(500).json(response);
        }else{
            let response = {
                message: `The to do was deleted correctly.`,
                type:'success'
            }
            res.status(201).json(response)
        }
    })
}

toDoController.editToDo = (req,res)=>{
    const errors = validator.validatorErrors(req);
    if (errors.length>0) {
        let listErrors = '';
        errors.forEach((err, index, errors)=>{
            listErrors += 'Error n°'+(index+1)+': '+err.msg+". "
        })
        let response = {
            message: listErrors,
            type:'danger'
        }
        return res.json(response)
    }else{
        const toDoEdit = new doModel({
            _id: req.params.id,
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        })
        doModel.findByIdAndUpdate(req.params.id,{$set:toDoEdit},{new:true},(err,toDo)=>{
            if(err){
                let response = {
                    message: `An error occurred while updating the to do. ${err}`,
                    type:'danger'
                }
                res.status(500).json(response);
            }
            else{
                let response = {
                    message: `The to do was updated correctly.`,
                    type:'success'
                }
                res.status(201).json(response)
            }
        })
    }
}

toDoController.chageStatus = (req,res)=>{
    const updateStatus = new doModel({
        _id: req.body.id,
        status: req.body.status
    })
    doModel.findByIdAndUpdate(req.body.id,{$set:updateStatus},(err,taskUpdated)=>{
        if(err){
            let response = {
                message: `An error occurred while updating the status. ${err}`,
                type:'danger'
            }
            res.status(500).json(response);
        }else{
            let response = {
                message: `Status updated correctly.`,
                type:'success'
            }
            res.status(201).json(response)
        }
    })
}

toDoController.assignUser = (req,res)=>{
    doModel.findOne({title:req.body.taskName},(err,toDo)=>{
        if(toDo){
            User.findOne({name:req.body.userVirtual},(err,user)=>{
                if(user){
                    console.log(user.name, user._id)
                    const editToDo =  new doModel({
                        _id: toDo._id,
                        title: toDo.title,
                        description: toDo.description,
                        status: toDo.status,
                        user: user._id
                    })
                    doModel.findByIdAndUpdate(editToDo._id,{$set:editToDo},(err,toDoEdit)=>{
                        if(err){
                            let response = {
                                message: `An error occurred when assigning the task to the user. ${err}`,
                                type:'danger'
                            }
                            res.status(500).json(response);
                        }else{
                            let response = {
                                message: `The task was assigned to the user correctly.`,
                                type:'success'
                            }
                            res.status(201).json(response)
                        }
                    })
                }
            })
        }else{
            console.log("no consultro")
        }
    })
}

toDoController.removeUserToDo = (req,res)=>{
    const editTask = new doModel({
        user: null
    })
    doModel.findByIdAndUpdate(req.body.id,{$set:editTask},(err,toDo)=>{
        if(err){
            let response = {
                message: `An error occurred when removing the task to the user. ${err}`,
                type:'danger'
            }
            res.status(500).json(response);
        }else{
            let response = {
                message: `The task was removed to the user correctly.`,
                type:'success'
            }
            res.status(201).json(response)
        }
    })
}

module.exports = toDoController;