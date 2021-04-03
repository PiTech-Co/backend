const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
    Business_name: {
        type: String,
    },
})


const User = mongoose.model('Business', BusinessSchema);

module.exports = User;