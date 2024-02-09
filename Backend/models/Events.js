const mongoose = require('mongoose');

// Your schema
const Eventschema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "User"
    },

    title: {
        type: String,
        required: true,
        maxLength: 50,
    },
    
    description: {
        type: String,
        required: true,
        maxLength: 50, 
    },

    start: {
        type: String,
        required: true,
    },
    
    end: {
        type: String,
        required: true,
    },

    visibility: {
        type: [mongoose.Schema.Types.Mixed], // an array of user IDs or strings
        default: [] // visible to the creator by default
    }
});

// Create the model
const Event = mongoose.model('Event', Eventschema);

module.exports = Event;
