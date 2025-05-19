
const express=require('express')
const mysql=require('mysql2')
const cors=require('cors')
const app=express()

app.use(express.json())
app.use(cors())

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'students'
})
con.connect(err=>{
    if(err) return err
    console.log('Db Connected')
})

app.get('/',(req,res)=>{
    const sql='SELECT * FROM users'
    con.query(sql,(err,result)=>{
        if(err) return res.json('err')
        res.json(result)
        console.log(result)
    })
})

app.post('/create',(req,res)=>{
    const sql='INSERT INTO users (name,email) VALUES (?,?)'
    const {name,email}=req.body
    con.query(sql,[name,email],(err,result)=>{
        if (err) return res.status(500).json(err);
         return res.status(201).json({ message: 'User created' });
    })
})

// app.put('/update/:id',(req,res)=>{
//     const sql='INSERT INTO users (name,email) VALUES (?,?)'
//     const {name,email}=req.body
//     con.query(sql,[name,email],(err,result)=>{
//         if(err) return res.json('err')
//         res.json(result)
//         console.log(result)
//     })
// })

app.listen(1010,()=>{
    console.log('Server Is Running On Port: 1010')
})
