const mongoose = require('mongoose');

// Your schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please add the user name"],
    },

    email: {
        type: String,
        required: [true, "please add your user email address"],
        unique: [true, "Email address already exist"]
    },

    password: {
        type: String,
        required: [true, "please add the user password"]
    },
    loginTime: {
        type: String,
        required: true,
    },
   
    logoutTime: {
        type: String,
        required: true,
    }

},
    {
        timestamps: true,
    }
);

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
