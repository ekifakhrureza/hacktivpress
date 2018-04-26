const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique :  [true, 'username already exist'],
        required: [true, 'username cannot be empty']
    },
    name: {
        type: String,
        required: [true, 'name cannot be empty']
    },
    password: {
        type: String,
        required: [true, 'password cannot be empty']
    },

}, {
        timestamps: true
    })

userSchema.pre('save', function (next) {
    if (this.password) {
        var salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})

let User = mongoose.model('User', userSchema)

module.exports = User
