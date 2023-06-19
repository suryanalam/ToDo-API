const express = require('express');
const mongoose = require("mongoose");

//task Model
const Task = mongoose.model('Task');

const todoRouter = express.Router();

//get all tasks
todoRouter.get('/api/todo', async (req, res) => {
    let data = await Task.find({});
    if(data.length){
        res.send(data)
    }
    else{
        res.send('data not found !!')
    }
})


//get task by id
todoRouter.get('/api/todo/:id', async (req, res) => {
    let requestedId = req.params.id;
    let data = await Task.findOne({_id:requestedId});
    if(data){
        res.send(data)
    }
    else{
        res.send('task not found !!')
    }
})

// create a task
todoRouter.post('/api/todo', async (req, res) => {
    let {title,desc,status} = req.body;
    if(!title || !desc || !status){
        res.send('please enter all task details !!')
    }
    let task  =  new Task({
        title,
        desc,
        status
    })
    let data = await task.save();
    res.send(data)
    console.log(data)
    if(data){
        console.log('task created successfully !!')
    }
    else{
        console.log('error while creating a task !!')
    }
})

// update task by id
todoRouter.put('/api/todo/:id', async (req, res) => {
    let {title,desc,status} = req.body;
    const requestedId = req.params.id;
    let data = (await Task.updateOne({_id:requestedId},{$set:{title,desc,status}}))
    if(data.acknowledged){
        res.send('task updated successfully !!')
    }
    else{
        res.send('error while updating a task !!')
    }
})

// delete task by id
todoRouter.delete('/api/todo/:id', async (req, res) => {
    const requestedId = req.params.id;
    let data = (await Task.deleteOne({_id:requestedId}))
    if(data.acknowledged){
        res.send('task deleted successfully !!')
    }
    else{
        res.send('error while deleting a task !!')
    }
})

module.exports = todoRouter;