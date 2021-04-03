const mongoose = require('mongoose');

const ResidenceSchema = new mongoose.Schema({
    Residence_name: {
        type: String,
    },
    
})


const User = mongoose.model('Residence', ResidenceSchema);

module.exports = User;