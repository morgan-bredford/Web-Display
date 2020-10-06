const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
    },
    height: {
        type: Number
    }
},
{
    timestamps: true
}
)

const User = mongoose.model('User',userSchema)

module.exports = User