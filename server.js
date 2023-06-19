const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = process.env.PORT | 3000;

const Task = require('./db/Models/Task');

//Routes
const todoRouter = require('./db/routes/todo');

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// MongoDB Connection
const connectDB = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/todo',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>console.log('db connected'))
    .catch((err)=>console.log('error while connecting db',err));
}

connectDB();

app.use(todoRouter);

app.listen(PORT,()=>{
    console.log('server started at port',PORT);
});
