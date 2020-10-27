const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
    },
    firstname: {
        type: String,
        trim: true,
    },
    lastname: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
    },
    key: {
        type: String,
    },
    galleryimages: {
        type: Array,
    }
},
{
    timestamps: true
}
)

const User = mongoose.model('User',userSchema)

module.exports = User