const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')


require('dotenv').config()

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const flight = require('./routes/api/flight');


const app = express()

//body parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())

//DB config 
const db = require('./config/keys').mongoURI;

//connect to mongoDB

mongoose
   .connect(db)
   .then(() => console.log("MongoDB connected"))
   .catch(err => console.log(err))

//use routes 
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/flight', flight)



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`))
