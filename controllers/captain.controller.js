const captainModel = require('../models/captain.model.js');
const { validationResult } = require('express-validator');
const captainService = require('../services/captain.service.js');
const blacklistTokenModel = require('../models/blacklistToken.model.js');
module.exports.register = async(req,res,next)=>{
  const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array() 
        });
    }
 
    const {firstname,lastname ,email,password,vehicle}= req.body;

    const isCaptainExists = await captainModel.findOne({email:email});  
    if(isCaptainExists){
        return res.status(400).json({
            message: 'Captain with this email already exists'
        });
    }
    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
        firstname : firstname,
        lastname : lastname,
        email: email,
        password: hashedPassword,
        color: vehicle.color,
        model: vehicle.model,
        number: vehicle.number,
        capacity: vehicle.capacity,
        vehicleType: vehicle.type,
    })
    const token = await captain.generateAuthToken();
    res.status(201).json({
        message: 'Captain registered successfully',
        captain: {
            _id: captain._id,
            firstname: captain.firstname,
            lastname: captain.lastname,
            email: captain.email,
            vehicle: captain.vehicle,
            status: captain.status
        },
        token: token
    });
    
}


module.exports.login = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array() 
        });
    }

    const {email,password} = req.body;
    const captain = await captainModel.findOne({email:email});
    if(!captain){
        res.status(400).json({
            message: 'Invalid email or password'
        }); 
       
       
    }
    const isPasswordMatch = await captain.comparePassword(password);
       if(!isPasswordMatch){
           res.status(400).json({
               message: 'Invalid email or password'
           });
       }

        const token = await captain.generateAuthToken();
        res.cookie('token',token);
        res.status(200).json({
            message: 'Captain logged in successfully',
            captain: {
                _id: captain._id,
                firstname: captain.firstname,
                lastname: captain.lastname,
                email: captain.email,
                vehicle: captain.vehicle,
                status: captain.status
            },
            token: token
        });
}


module.exports.getCaptainProfile = async(req,res,next)=>{
    // const captain 
}

module.exports.logoutCaptain = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    
    await blacklistTokenModel.create({ token: token });
    res.clearCookie('token');
    res.status(200).json({
        message: 'Captain logged out successfully'
    });
}