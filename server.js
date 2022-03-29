const { required } = require("nodemon/lib/config");
require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/user')


app.use(express.json())
app.use('/users', userRouter)

app.get('/', (req,res)=>{
    res.send('this is home')
})

mongoose.connect(process.env.DB_CONN,{useNewUrlParser:true})
const dbcon = mongoose.connection;
dbcon.on('error', (err) => console.log(err));
dbcon.once('open', () => console.log('Connected to db'));



app.listen(9000, () =>  console.log('server started'));

