const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
    },
    summary: {
        type: String,
    },
    image: {
        type: String
    }
});

const User = mongoose.model('user',UserSchema);

module.exports = User;