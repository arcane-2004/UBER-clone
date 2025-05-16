const mongooes = require('mongoose')

const rideSchema = new mongooes.Schema({
    user: {
        type: mongooes.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captain: {
        type: mongooes.Schema.Types.ObjectId,
        ref: 'Captain',
    },
    pickup: {
        type: String,
        require: true
    },
    destination: {
        type: String,
        require: true
    },
    fare: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancle'],
        default: 'pending'
    },
    dutration: {
        type: Number
    },
    distance: {
        type: Number
    },
    paymentID: {
        type: String
    },
    orderID: {
        type: String
    },
    signature: {
        type: String
    },
    vehicleType: {
        type: String,
        enum: ['Car', 'Bike', 'Auto'],
        required: true
    },
    otp: {
        type: String,
        select: false,
        required: true
    }


})

module.exports = mongooes.model('ride', rideSchema)