const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength:[3, 'First name must be 3 characters or long'],
        },
        lastlname: {
            type: String,
            minlength:[3, 'Lastname must be 3 characters or long'],
        }
    },

    email: {
        type: String,
        require: true,
        unique: true,
        minlength: [5]
    },

    password:{
        type: String,
        require: true,
        select: false
    },

    socketId: {
        type: String,
    }
})

userSchema.method.generateAuthToken = function(){
    const token = jwt.sign({_id : _this._id}, process.env.JWT_SECRET);
    return token;
}

userSchema.method.comparePassword =async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.static.hashpassword = async function (password) {
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;