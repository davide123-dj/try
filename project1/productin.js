const express=require('express');
const cors=require('cors');
const mysql=require('mysql');
const port=8080;

const app=express();
app.use(cors());
app.use(express.json());

const conne=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:'saint-anne'
});

conne.connect((err)=>{
    if(err){
        console.error('error in connection',err);
        return;
    }
    app.listen(port,()=>{
        console.log('server is run on port:',port);
    });
    console.log('connection is done');
});

app.post('/productin',(req,res)=>{
    const {productname,date,quality,price}=req.body;
    conne.query('INSERT INTO product_in(productname,date,quality,price) VALUES (?,?,?,?)',[productname,date,quality,price],
        (err,result)=>{
            if(err) return res.status(500).json({error:'errer in add product'});
                console.error('err in post:',err);  
        }
    )
});

app.get('/productin',(req,res)=>{
    conne.query('SELECTE * FROM product_in',(err,result)=>{
        if(err) return res.status(500).json({error:'plase waite have erro:',err});
        console.error('error in get:',err);
    });
});

app.post('/productin/:id',(req,res)=>{
    const{productname,date,quality,price}=req.body;
    conne.query('UPDATE product_in SET productid=?,date=?,quality=?,price=? WHERE id=?',[productname,date,quality,price,res.paramas.id],
        (err,result)=>{
            if(err) return res.status(500).json({message:'error in update'})
                console.error('error in post:',err)
        }
        
    );
});

app.delete('/productin/:id',(req,res)=>{
    conne.query('DELETE FROM product_in WHERE id=?',[req.params.id],(err,result)=>{
        if(err) return res.status(500).json({error:'error in delete'})
            res.json({message:'you delete now'})
    });
});

