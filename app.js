const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(cors());
app.get('/',(req,res)=>{
    res.send('hello world');
});

module.exports = app;