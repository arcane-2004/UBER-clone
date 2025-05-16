const rideModel = require('../models/ride.model')
const mapService = require('./maps.service')
const crypto = require('crypto');

function getOtp(num){
    function generateOtp(num){
        const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString()
        return otp;
    }
    return generateOtp(num);
}

async function getFare(pickup, destination){
    if(!pickup || !destination){
        throw new Error('Pickup and destination are required');
    }
    
    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
        car: 50,
        auto: 30,
        motorcycle: 20
    };

    const perKmRate = {
        car: 10,
        auto: 7,
        motorcycle: 5
    };

    const perMinuteRate = {
        car: 2,
        auto: 1.5,
        motorcycle: 1
    };

    const fares = {
        Car: baseFare.car + ((distanceTime.distance.value/1000) * perKmRate.car) + ((distanceTime.duration.value)/60 * perMinuteRate.car),

        Auto: baseFare.auto + ((distanceTime.distance.value/1000) * perKmRate.auto) + ((distanceTime.duration.value)/60 * perMinuteRate.auto),

        Bike: baseFare.motorcycle + ((distanceTime.distance.value/1000) * perKmRate.motorcycle) + ((distanceTime.duration.value)/60 * perMinuteRate.motorcycle)
    };

    return fares;
}

module.exports.createRide = async({
    user, pickup, destination, vehicleType
}) =>{
    if(!user || !pickup || !destination || !vehicleType){
        throw new Error('All fields are  required')
    }

    const fare =await getFare(pickup, destination)

    const ride =await rideModel.create({
        user,
        pickup,
        destination,
        vehicleType,
        otp: getOtp(6),
        fare : fare[vehicleType]
    })
    return ride;
}

