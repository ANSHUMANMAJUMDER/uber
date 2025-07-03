const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookie = require('cookie-parser');
const app = express();
const connectToDB = require('./db/db.js');
const userRoutes = require('./routes/user.routes.js');
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({extended:true}));
app.use('/users',userRoutes);
connectToDB();
app.get('/',(req,res)=>{
    res.send('hello world');
});

module.exports = app;