const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');//built in , no need to npm install

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please add a name'],
        maxlength: [30, 'Name cannot be more than 30 characters'],
        minlength: [3, 'Name must be at least 3 characters']
    },
    email:{
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        validate: [validator.isEmail, 'Please add a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please add a password'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false
    },
    avatar:{
        public_id: {
            type: String,
            required: [true, 'Please add a avatar']
        },
        url: {
            type: String,
            required: true
        }
    },
    role:{
        type: String,
        default: 'user'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

//compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//generating password reset token
userSchema.methods.getResetPasswordToken = function(){
    //generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //hashing and adding resetPasswordToken
    //sha256 is algo name
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.resetPasswordExpire = Date.now() + 15*60*1000;//15 minutes

    return resetToken;
}

module.exports = mongoose.model('User', userSchema);