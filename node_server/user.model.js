const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
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
    },
    image: {
        type: Object,
    },
    entries: {
        type: Object,
    }
},
{
    timestamps: true
}
)

const User = mongoose.model('User',userSchema)

module.exports = User