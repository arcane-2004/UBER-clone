const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middlewares/auth.middleware')
const mapController = require('../controllers/map.controller')
const { query } = require('express-validator')

router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authMiddleWare.authUser,
    mapController.getCoordinates
)

router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleWare.authUser,
    mapController.getDistanceTime
)

router.get('/get-suggestions',
    query('input').isString().isLength({min:3}),
    authMiddleWare.authUser,
    mapController.getSuggestion
)

module.exports = router;