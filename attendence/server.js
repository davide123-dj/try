const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const port=6000;
const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/playes').then(()=>{
    app.listen(port,()=>{
        console.log('connection is done',port);
    });
    console.log('server is run well');
}).catch((err=>{
    console.error('error in connection',err);
}));

const player=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
      email:{
        type:String,
        required:true,
        unique:true
    },
      position:{
        type:Number,
        required:true,
        unique:true
    },
      number:{
        type:Number,
        required:true,
        unique:true
    }
});
const Design=mongoose.model('Design',player);

app.post('/players',async(req,res)=>{
    const [name,email,position,number]=req.body;
    const newItem=new player({name,email,position,number})
    await player.save();
    res.status(201).json(player);
});
app.get('/players',async(req,res)=>{
    const players= await player.find()
    res.status(200).json(players);
});
app.put('/players/:id',async(req,res)=>{
    const [name,email,position,number]=req.body;
    const updatedPlayers= await player.findByIdAndUpdate(res.params.id,{name,email,player,number},{new:true, runvalidation:true});
    res.status(201).json(player);
});
app.delete('/players/:id',async(req,res)=>{
   co
   await player.findByIdAndDelete(res.params.id);
   res.json({massage:"you delete"});
});