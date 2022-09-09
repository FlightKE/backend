
const router = require('express').Router();
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

// load User model
const User = require('../../models/Users')


router.get('/test', (req, res) => res.json({msg: 'Users works'}));

//get all users 
router.route('/').get((req,res) => {
    User.find()
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error:' + err))
});

//get one user 
router.route('/:id').get((req,res) => {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error:' + err))
})

//register a user 
router.route('/register').post((req,res) => {
    debugger;
    console.log(req.body)
   User.findOne({ email: req.body.email})
    .then(user => {
        if (user) {
            return res.status(400).json({email:'email already exist'})
        }else{
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r:  'pg',
                d:  'mm'
            })
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
    });

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error:' + err));

    // bcrypt.genSalt(10,(err,salt) => {
    //     bcrypt.hash(newUser.password, salt, (err,hash) =>{
    //         if(err) throw err;
    //         newUser.password = hash;
    //         newUser.save()
    //           .then(user => res.json(user))
    //           .then(err => console.log(err))
    //     })
    // })
}
})

})

//login a user 
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //find user by email
    User.findOne({email})
    .then(user =>{
        //check for user
        if(!user) {
            return res.status(404).json({email: 'User not found'})
        }
    });
});

//update a user 

router.route('/:id').put(( req, res) => {
    User.findById(req.params.id)
    .then(user => {
        user.name = req.body.name;
        user.email = req.body.email;
        user.avatar = req.body.avatar;
        user.password = req.body.password;

        user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error:' + err))
    })

    .catch(err => res.status(400).json('Error: ' + err));
});

//delete a user

router.route('/:id').delete((req,res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json ('User deleted.'))
    .catch(err => res.status(400).json('Error:' + err ))
})





module.exports = router;