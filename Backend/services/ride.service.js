const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');
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
        Car: Number((baseFare.car + ((distanceTime.distance.value/1000) * perKmRate.car) + ((distanceTime.duration.value)/60 * perMinuteRate.car)).toFixed(2)),
        Auto: Number((baseFare.auto + ((distanceTime.distance.value/1000) * perKmRate.auto) + ((distanceTime.duration.value)/60 * perMinuteRate.auto)).toFixed(2)),
        Bike: Number((baseFare.motorcycle + ((distanceTime.distance.value/1000) * perKmRate.motorcycle) + ((distanceTime.duration.value)/60 * perMinuteRate.motorcycle)).toFixed(2))
    };

    return fares;
}

module.exports.getFare = getFare;

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

module.exports.confirmRide = async ({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;

}

module.exports.startRide =async ({rideId, otp, captain}) =>{
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    })

    return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;

}