const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller.js');
const {body}=require('express-validator');
const authMiddleware = require('../middleware/auth.middleware.js');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('lastname').isLength({min:3}).withMessage('Last name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters')
],userController.register);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters')
],userController.login);


router.get('/profile',authMiddleware.authUser,userController.getUserProfile);
router.get('/logout',authMiddleware.authUser,userController.logoutUser);
module.exports= router;
