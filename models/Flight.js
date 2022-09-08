const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//create Schema 

const FlightSchema = new Schema ({

    name:{
        type: String,
        required: true
    },
   
    avatar:{
        type: String,
        
    },
   

});

module.exports = User = mongoose.model('profile', FlightSchema);