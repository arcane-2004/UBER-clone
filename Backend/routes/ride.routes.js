const express = require('express')
const router = express.Router();
const {body, query}  = require('express-validator')
const rideController = require('../controllers/ride.controller')
const authMiddleware = require('../middlewares/auth.middleware')


router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('invalid pickup'),
    body('destination').isString().isLength({min:3, max:24}).withMessage('invalid destination'),
    body('vehicleType').isString().isIn(['Car', 'Bike', 'Auto']).withMessage('invalid vehicle type'),
    
    rideController.createRide
)

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('Invalid Pickup'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid destination'),
    rideController.getFare
)

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
)

router.get('/start-ride',
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({min:6, max:6}).withMessage('Invalid otp'),
    rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)

module.exports = router