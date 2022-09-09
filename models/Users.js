const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//create Schema 

const UserSchema = new Schema ({

    name:{
        type: String,
       
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        
    },
   

});

module.exports = User = mongoose.model('users', UserSchema);