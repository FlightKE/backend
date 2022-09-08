const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//create Schema 

const FlightSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
   name:{
        type: String,  
        required: true
    },
    avatar: {
        type: String,
    },
    flight_description: {
        type: String,
        
    },
    type_of_aircraft: {
        type: String,
        
    },
    model_of_aircraft: {
        type: String,
    },
    arrival_location: {
        type: String,
        required: true
    },
    destination_location: {
        type: String,
        
    },
    flight_duration: {
        type: String,
       
    },
    date: {
        type: Date,
        deafult: Date.now
    }
    
   

});

module.exports = Flight = mongoose.model('flight', FlightSchema);