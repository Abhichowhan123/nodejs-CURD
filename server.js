const express = require('express')
const app= express()
const studentRoutes = require('./src/student/routes');

const port = 5842
// app.use(express.json());
// app.get("/",(req,res)=>{
//     res.send("hello world")
// })


app.use('/api/v1/students',studentRoutes);

app.listen(port,()=>console.log('app is runing '))