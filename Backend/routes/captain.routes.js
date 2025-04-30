const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const captainController = require('../controllers/captain.controller')
const authMiddleWare = require('../middlewares/auth.middleware')

router.post('/register', [
    body('email').isEmail().withMessage('Invail Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 character long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 3 character long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['Car', 'Bike', 'Auto']).withMessage('Invalid')
],

    captainController.registerCaptain
)

router.post('/login',[
    body('email').isEmail().withMessage('Invail Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 3 character long'),
],
    captainController.loginCaptain
)

router.get('/profile', authMiddleWare.authCaptain, captainController.getCaptainProfile)

router.get('/logout', authMiddleWare.authCaptain ,captainController.logoutCaptain)

module.exports = router;