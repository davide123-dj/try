const express=require('express');
const mongoose=require('mongoose');
const App=express();
const port=5000;
App.use(express.json());
mongoose.connect('mongodb://localhost:27017/try').then(()=>{
    console.log(' database is connected');
}).catch((err)=>{
    console.error('error is rhisi',err);
});
console.log('server is runing on',{port});