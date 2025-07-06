const userModel = require('../models/user.model.js');
const captainModel = require('../models/captain.model.js');
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
        const user = await captainModel.findById(decoded._id);
        
        req.user = user;
         return next(); //it calls next function


    }catch(error){
        return res.status(401).json({
            'message':'Unauthorized'
        });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    try {
        const token =
            req.cookies.token ||
            (req.headers.authorization?.startsWith('Bearer ')
                ? req.headers.authorization.split(' ')[1]
                : null);

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const isBlacklisted = await captainModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Optional: fetch the captain document if needed
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized: Captain not found' });
        }

        req.user = captain; // attach captain to request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }
};