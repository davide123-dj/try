const express=require('express');
const cors=require('cors');
const mysql=require('mysql');
const port=7070;

const app=express();

app.use(cors());
app.use(express.json());

const conne=mysql.createConnection({
    host:'loacalhost',
    user:'root',
    password:'',
    database:'saint-anne'
})

conne.connect((err)=>{
    if(err){ 
        console.error({error:'error in connection'})
    }
    app.listen(port,()=>{
        console.log('in the server is run well');
    })
    console.log('connection is done');

})

app.post('/productout',(req,res)=>{
    const{productname,quantity,date}=req.body;
    conne.query('INSERT INTO product_out(productname,quantity,date) VALUES(?,?,?)',[productname,quantity,date],
        (err,result)=>{
            if(err) return res.status(500).json({message:'in record have problem:',err})
                res.json({message:'error in record'});
        }
    );

});

app.get('/productout',(req,res)=>{
    conne.query('SELECT * FROM product_out',(err,result)=>{
        if(err) return res.status(500).json({Error:'error in show you data'})
            res.json({message:'waite som thing is long'})
    });
});

app.put('/productout/:id',(req,res)=>{
    const{productname,quantity,date}=req.body;
    conne.query('UPDATE product_out SET productname=?,quantint=?,date=? WHERE id=?',[productname,quantity,date,req.params.id],
        (err,result)=>{
            if(err) return res.status(500).json({Error:'error in update'})
                res.json({message:'in update they are some thing error'})
        }
    )
})

app.delete('/productout/:id',(req,res)=>{
    conne.query('DELETE FROM product_out WHERE id=?',[req.params.id],(err,result)=>{
        if(err) res.status(500).json({error:'errer in delete'})
            res.json({message:'error in delete'})
    })
})