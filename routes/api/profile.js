const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport'); // used for protected routes

//Load Validation
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

//Load Profile Model
const Profile = require('../../models/Profile');
//Load User Model
const User =  require('../../models/User');
// const Deck = require('../../models/Deck');


// router.get('/fix', (req,res) => {
//     Profile.findOne({user: req.body.id}).then(profile =>{
//         Deck.find().then(decks=> {
//             decks = decks.map(deck => deck.id.toString())
//             let i = 0
//             // console.log(decks)
//             for(i; i < profile.decks.length;i++ ){
//                 console.log(profile.decks.length, i)
//                 if(decks.includes(profile.decks[i].toString()) === true) {
//                     console.log( true ) 
//                 }else{
//                     profile.decks.splice(i,1)
//                     i--
//                 }
//             }
//             console.log(profile.decks)
//             profile.save()
//         }).res(()=> res.json({msg: "success"}))
//     }).catch(err => res.json(err))
// })


//@route    GET api/profile/all
//@desc     gets all profiles
//@access   public
router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = 'There are no profiles';
                return res.status(404).json(errors);
            }
            
            res.json(profiles);
        })
        .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

//@route    GET api/profile/
//@desc     gets current user's profile
//@access   private
router.get('/', passport.authenticate('jwt', { session: false }), (req,res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id})
    .populate({ path:'decks', select: ['subject', 'description', 'id', 'handle', 'cards', 'likes', 'comments', 'user', 'date']})
    .populate('user', ['name', 'avatar'])
    .then( profile => {
        if(!profile) {
            errors.noprofile = 'There is no profile for this user';
            return res.json({})
        }
        res.json(profile);
    })
    .catch(err => res.json({msg: "Profile doesn't exist"})) // catch for findOne
});

//@route    GET api/profile/handle/:handle
//@desc     Get profile by handle
//@access   Public

router.get('/handle/:handle', (req, res) => {
    const errors = {}

    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = "There is no profile for this user"
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

//@route    GET api/profile/user/:user_id
//@desc     Get profile by user ID
//@access   Public

router.get('/user/:user_id', (req, res) => {
    const errors = {}

    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "There is no profile for this user"
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json({Profile: "There is no profile for this user"}));
});


//@route    POST api/profile/
//@desc     Create user profile
//@access   private
router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateProfileInput(req.body);
        // Check Validation 
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }
        //Get fields 
        const profileFields = {};
        profileFields.user = req.user.id;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.bio) profileFields.bio = req.body.bio;
        

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (profile) {
                    //Update
                    Profile.findOneAndUpdate(
                        { user: req.user.id },
                        { $set: profileFields },
                        { new: true }
                    )
                        .then(profile => res.json(profile))
                } else {
                    //create

                    // Check to see if a handle exists
                    Profile.findOne({ handle: profileFields.handle }).then(profile => {
                        if (profile) {
                            errors.handle = "That handle already exists";
                            res.status(400).json(errors);
                        }

                        // Save Profile
                        new Profile(profileFields).save().then(profile => res.json(profile));
                    })
                }
            });
    }
);


//@route    POST api/profile/experience
//@desc     Add experience to profile
//@access   private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    //Check Validation 
    if (!isValid) {
        //Return any errors with 400 status
        return res.status(400).json(errors);
    }

    Profile.findOne({user: req.user.id})
    .then(profile => {
        const newExp = {
            title: req.body.title, 
            company: req.body.company,
            location: req.body.location, 
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }

        //Add to exp array
        profile.experience.unshift(newExp);

        profile.save().then(profile => res.json(profile));
    })
});


//@route    POST api/profile/education
//@desc     Add education to profile
//@access   private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    //Check Validation 
    if (!isValid) {
        //Return any errors with 400 status
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            //Add to exp array
            profile.education.unshift(newEdu);

            profile.save().then(profile => res.json(profile));
        })
})


//@route    DELETE api/profile/experience/:exp_id
//@desc     Delete Experience from profile
//@access   private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {
        
        // brads way: (
        //Get remove index
        // const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        //splice out of array
        // profile.experience.splice(removeIndex, 1);
        //)

        profile.experience.remove({ _id: req.params.exp_id})
        profile.save().then(profile => res.json(profile))
            .then(result => res.json(result.experience)).catch(err => res.status(404).json(err))
    }).catch(err => res.status(404).json(err));
})

//@route    DELETE api/profile/education/:edu_id
//@desc     Delete Education from profile
//@access   private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {

        profile.education.remove({ _id: req.params.edu_id })
        profile.save().then(profile => res.json(profile))
            .then(result => res.json(result.education)).catch(err => res.status(404).json(err))
    }).catch(err => res.status(404).json(err));
});

//@route    DELETE api/profile
//@desc     Delete User and profile
//@access   private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndRemove( {user: req.user.id})
        .then(() => {
            User.findOneAndRemove( {_id: req.user.id })
                .then(()=> res.json({success: true})
                )
        });
});



module.exports = router;