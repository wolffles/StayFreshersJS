const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    bio:{
        type: String
    },     
    decks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'decks'
        }
    ],
    friends:[
        {
            type: Schema.Types.ObjectId,
            ref:'profile'
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }       

});

module.exports = Profile = mongoose.model('profile', ProfileSchema)