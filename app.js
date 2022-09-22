// const express = require('express');// adding express libary
// const app  =express();// creating a express application
// const client = require("./connection.js")


// const userRoute = require('./api/routes/user');

// const mongoose =  require('mongoose');
// const bodyParser  = require('body-parser');



// mongoose.connect('mongodb+srv://admin:admin@cluster0.8ieou.mongodb.net/?retryWrites=true&w=majority')
// mongoose.connection.on('error',err=>{
//     console.log('connection failed');
// })

// mongoose.connection.on('connected',connected=>{
//     console.log('connected with database');
// })

// // bodyParser
// app.use(bodyParser.urlencoded({extended:false})); // hum ismai URL ke sath value bej skte hai
// app.use(bodyParser.json()); // jo data hum bhjengy wo json form mai hoga


// app.use('/user',userRoute);


// app.use((req,res,next)=>{
//     res.status(404).jason({
//         error:'bad request'
//     })
// })

// // app.use((req,res,next)=>{
// //     res.status(200).json({
// //         message:'app is runing'
// //     })
// // })

// module.exports = app; //aagr dusre jaga pe is aap file ko use karna hai tho module.exports ka use kar te hai











// function generateRandomString(lenght){
//     var char = '0123456789mnbvcxzasdfghjklpoiuytrewqMNBVCXZASDFGHJKLPOIUYTREWQ!@#$%^&*()_+?><:;"[]{}=-`~';
//     var random_string = '';
//     if (lenght>0){
//         for(var i = 0;i<lenght;i++){
//             random_string+=char.charAt(Math.floor(Math.random()*char.length));
//         }
//     }
//     console.log( random_string)
// }
// generateRandomString(5);