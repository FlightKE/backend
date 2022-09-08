const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport');


//Flight model
const Flight = require('../../models/Flight')
//profile model
const Profile = require('../../models/Profile')

router.get('/test', (req, res) => res.json({msg: 'flight works'}));


//create flight 

router.post('/', 
passport.authenticate('jwt', {session:false}), 
(req, res) => {
    const newFlight = new Flight({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    })

    newFlight.save().then(flight => res.json(flight) )
})

//update a flight
router.put('/:id').put(( req, res) => {
    Flight.findById(req.params.id)
    .then(flight => {
        flight.text = req.body.text;
        flight.name = req.body.name;
        flight.flight_description = req.body.flight_description;
        flight.type_of_aircraft = req.body.type_of_aircraft;
        flight.model_of_aircraft = req.body.model_of_aircraft;
        flight.arrival_location = req.body.arrival_location;
        flight.destination_location = req.body.destination_location;
        flight.flight_duration = req.body.flight_duration
        flight.avatar = req.body.avatar;
        

        flight.save()
        .then(() => res.json('User flight updated!'))
        .catch(err => res.status(400).json('Error:' + err))
    })

    .catch(err => res.status(400).json('Error: ' + err));
});
//fetch a single flight 
router.get('/', (req, res) => {
    Flight.find()
    .sort({date: -1 })
    .then( flights => res.json(flights))
    .catch( err => res.status(404).json({noflightsfound: 'No flights found'}));
})

//fetch a single flight by id
router.get('/:id', (req, res) => {
    Flight.findById(req.params.id)
    .then(flight => res.json(flight))
    .catch(err => res.status(404).json({noflightfound: 'No flight found'}))
})

//Delete Flight 
router.delete('/:id', 
passport.authenticate('jwt', {session:false}), 
(req, res) => {
    Profile.findOne({ user: req.user.id})
    .then( profile =>{
        Flight.findById(req.parama.id)
        .then(flight => {
            // Check for flight Owner 
            if(flight.toString() !== req.user.id) {
                return res.status(401).json({notauthorized: 'User not authorized'})
            }

            //delete
            flight.remove().then(() => res.json({success:true}))
        })
            .catch(err => res.status(404).json({ flightnotfound: 'No flight found'}))

        
    })
})

module.exports = router;