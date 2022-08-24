const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');

const linkSchema = new mongoose.Schema({
    link: {
        type: String,
        required: 'Link is required'
    },
    title: {
        type: String,
        required: 'Title is required'
    },
    bg: String,
    text: String,
    order: Number
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: "Username is required",
        trim: true,
        unique: true,
        lowercase: true,
        max: 20
    },
    email: {
        type: String,
        required: "Email address is required",
        trim: true,
        unique: true,
        lowercase: true
    },
    displayName: {
        type: String,
    },
    password: {
        type: String,
        required: "Password is required",
        bcrypt: true
    },
    description: {
        type: String,
        max: 150
    },
    bg: {
        type: String,
        default: '#ffffff'
    },
    text: {
        type: String,
        default: '#000000'
    },
    links: [linkSchema]
});

userSchema.plugin(mongooseBcrypt);
userSchema.plugin(passportLocalMongoose, {usernameField: 'username'});
module.exports = mongoose.model('User', userSchema);