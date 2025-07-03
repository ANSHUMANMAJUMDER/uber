const userModel = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const { cookie } = require('express-validator');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    // console.log(req.headers.authorization);
    
    const token = req.cookies.token ||req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({
            'message':'Unauthorized'
        });
    }
     const isBlacklisted = await userModel.findOne({token:token});
     if(isBlacklisted){
        return res.status(401).json({
            'message':'Unauthorized'
        });
     }
    try{
        
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        const user = await userModel.findById(decoded._id);
        
        req.user = user;
         return next(); //it calls next function


    }catch(error){
        return res.status(401).json({
            'message':'Unauthorized'
        });
    }
}