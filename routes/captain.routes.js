const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller.js');
const { body } = require('express-validator');
const AuthMiddleware = require('../middleware/auth.middleware.js');
router.post('/register',[
   body('email').isEmail().withMessage('Invalid email'),
    body('firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.model').isLength({ min: 3 }).withMessage('Model must be at least 3 characters long'),
    body('vehicle.number').isLength({ min: 3 }).withMessage('Number must be at least 3 characters long'),
    body('vehicle.type').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be either car, bike, or auto'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1')
],captainController.register);
router.post('/login',[
body('email').isEmail().withMessage('Invalid email'),
body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
],captainController.login);
router.get('/profile',AuthMiddleware.authCaptain, captainController.getCaptainProfile);
router.get('/logout', captainController.logoutCaptain);

module.exports = router;