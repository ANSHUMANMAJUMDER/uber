const userModel  = require('../models/user.model.js');
const userService = require('../services/service.js');
const {validationResult} = require('express-validator');
const blacklistTokenSchema = require('../models/blacklistToken.model.js');
module.exports.register = async (req,res,next)=>{
 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array() 
        });
    }
    const {firstname, lastname, email, password} = req.body;

     const hashedPassword = await userModel.hashPassword(password);

     const user = await userService.createUser({
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:hashedPassword
     });

     const token = await user.generateAuthToken();
     res.status(201).json({user, token});
       
     
}


module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  try {
    // Fetch the user by email and include the password field explicitly
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) { 
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate an authentication token
    const token = user.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({ user, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.logoutUser = async(req,res,next)=>{
   res.clearCookie('token');
    res.status(200).json({
        message: 'User logged out successfully'
    });
}



module.exports.getUserProfile = async(req,res,next)=>{
   res.status(200).json(req.user);
   await blacklistTokenSchema.create({
       token: req.cookies.token || req.headers.authorization.split(' ')[1],
       userId: req.user._id
   });
}