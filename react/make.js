const express=require('express');


const app=express();
app.use(express.json());

let books=[{id:1, name:"davide", age:40},
    {id:2, names:"davi", age:30},
    {id:3, names:"vide", age:20}
];

app.get('/books',(req,res)=>{
    res.json(books);
});

app.post('/books',(req,res)=>{
    const newBooks=req.body;
    newBooks.id=books.length+1;
    books.push(newBooks);
    res.status(201).json(newBooks);

})

app.listen(5000,()=>{
    console.log('server is running')
})