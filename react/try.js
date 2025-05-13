const express=require('express');
const app=express();



app.use(express.json());



app.get('/book',(req,res)=>{
    res.json(books);

});
// app.post('/book',(req,res)=>{
//     res.send('try to make')

// });
// app.get('/book:id',(req,res)=>{
//     res.send('try to make')

// });
// app.put('/book',(req,res)=>{
//     res.send('try to make')

// });
// app.patch('/',(req,res)=>{
//     res.send('try to make')

// });
// app.delete('/',(req,res)=>{
//     res.send('try to make')

// });
let books = [
    { id: 1, title: "Ubumenyi", author: "Eric" },
    { id: 2, title: "Imiyoborere", author: "Alice" }
  ];
  
app.listen(5000,()=>{
    console.log('serve is running');
});