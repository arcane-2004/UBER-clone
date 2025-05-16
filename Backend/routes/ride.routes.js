const express = require('express')
const router = express.Router();
const {body}  = require('express-validator')
const rideController = require('../controllers/ride.controller')
const authMiddleware = require('../middlewares/auth.middleware')


router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('invalid pickup'),
    body('destination').isString().isLength({min:3, max:24}).withMessage('invalid destination'),
    body('vehicleType').isString().isIn(['Car', 'Bike', 'Auto']).withMessage('invalid vehicle type'),
    
    rideController.createRide
)

module.exports = router