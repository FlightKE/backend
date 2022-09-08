const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile  Model 
const Profile = require("../../models/Profile")
//Load User Profile
const User = require("../../models/Users")
//load Profile Model
router.get('/test', (req, res) => res.json({msg: 'Profile works'}));

//get current user 
router.get('/', 
passport.authenticate('jwt', { session: false}), 
(req, res) => {
    const errors = {};

    Profile.findOne({user: req.user.id})
    .then(profile => {
        if(!profile) {
            errors.noProfile = "There is no profile for this user";
            return res.status(404).json(errors);
                }    
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
});


//create user profile
router.post('/', 
passport.authenticate('jwt', { session: false}), 
(req, res) => {
    
    Profile.findOne({user: req.user.id})
    .then(profile => {
        const profileFields ={};
        profileFields.user = req.user.id;
        if(req.body.bio) profileFields.bio = req.body.bio;

        //Skills
        if( typeof req.body.Skills !== 'undefined') {
        profileFields.Skills = req.body.Skills.split();
        }
        if(req.body.location) profileFields.location = req.body.location;
        //social
        profileFields.social = {}
        if(req.body.youtube) profileFields.youtube = req.body.youtube;
        if(req.body.twitter) profileFields.twitter = req.body.twitter;
        if(req.body.facebook) profileFields.facebook = req.body.facebook;
        if(req.body.linkedin) profileFields.linkedin = req.body.linkedin;
        if(req.body.instagram) profileFields.instagram = req.body.instagram;
       
       Profile.findOne({user: req.user.id})
       .then(profile => {
        if(profile){
            //update
            Profile.findOneAndUpdate(
            { user: req.user.id},
            { $set: profileFields},
            { new: true}
            ).then(profile => res.json(profile));
        }else{
            //create

            //check
            Profile.findOne({handle: profileFields.handle}).then(profile => {
                if(profile){
                    errors.handle = "That handle already exist";
                    res.status(400).json(errors)
                }

                //save profile

                new Profile(profileFields).save().then(profile => res.json(profile));
            })
        }
       })
        
       //Add experience to profile
      router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {
        Profile.findOne({user: req.user.id})
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company:req.body.company,
                location:req.body.location,
                from: req.body.from,
                to: req.body.to,
                current:req.body.current,
                description: req.body.description
            }

            //Add to exp array 
            profile.experience.unshift(newExp);
            profile.save().then(profile => res.json(profile))
        })
      })

      //add education route 
      router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {
        Profile.findOne({user: req.user.id})
        .then(profile => {
            const newEdu = {
                school: req.body.school,
                degree:req.body.degree,
                fieldofstudy:req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current:req.body.current,
                description: req.body.description
            }

            //Add to exp array 
            profile.education.unshift(newEdu);
            profile.save().then(profile => res.json(profile))
        })
      })

      //delete experience route 
      router.delete('/experience/:exp_id',
      passport.authenticate('jwt', {session: false}), 
      (req, res) => {
        Profile.findOne({user: req.user.id})
       //get remove index 
       const removeIndex = profile.experience 
       .map(item => item.id)
       .indexOf(req.params.exp_id);

       //Splice out of array 
       profile.experience.splice(removeIndex, 1);

       // Save
       profile.save().then(profile => res.json(profile));
      })

});

 //delete education route 
 router.delete('/education/:edu_id',
 passport.authenticate('jwt', {session: false}), 
 (req, res) => {
   Profile.findOne({user: req.user.id})
  //get remove index 
  const removeIndex = profile.education
  .map(item => item.id)
  .indexOf(req.params.edu_id);

  //Splice out of array 
  profile.education.splice(removeIndex, 1);

  // Save
  profile.save().then(profile => res.json(profile));
 })
   
 
})

 //delete api/profile route 
 router.delete('/',
 passport.authenticate('jwt', {session: false}), 
 (req, res) => {
   Profile.findOneAndRemove({user: req.user.id})
   .then(() => {
    User.findOneAndRemove({_id: req.user.id})
     .then(() => res.json({ success: true}))
   })
   
 })
   
 


module.exports = router;