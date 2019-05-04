const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//deck model
const Deck = require('../../models/Deck')
// Profile model
const Profile = require('../../models/Profile')
//Validation
const validateDeckInput = require('../../validation/deck');
const validateCardInput = require('../../validation/card');


//@route    GET api/decks
//@desc     gets all decks
//@access   public 
router.get('/', (req, res) => {
    Deck.find()
        .sort({ date: -1})
        .then(decks => res.json(decks))
        .catch( err => res.status(404).json({nodecksfound: "No decks found"}));
});

//@route    GET api/decks
//@desc     gets a decks
//@access   public 
router.get('/:id', (req, res) => {
    Deck.findById(req.params.id)
        .then(decks => res.json(decks))
        .catch(err => res.status(404).json({nodeckFound: "no deck found with that ID"}));
})

//@route    POST api/decks
//@desc     Creates a deck
//@access   private
router.post('/', passport.authenticate('jwt', { session:false}), (req, res) => {
    const {errors, isValid } = validateDeckInput(req.body);

    // Check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }
    Profile.findOne({user: req.user.id}).then(pro => {
        const newDeck = new Deck({
            subject: req.body.subject,
            description: req.body.description,
            handle: req.body.handle,
            avatar: req.body.avatar,
            user: req.user.id
        });
        pro.decks.unshift(newDeck._id)
        pro.save().then(pro => {
            newDeck.save().then(deck => res.json(deck))
        })
    })
});

//@route    POST api/deck/card/:deck_id/
//@desc     Creates a card for a deck
//@access   private
router.post('/card/:deck_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateCardInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    Deck.findById(req.params.deck_id)
        .then(deck => {
            const newCard = {
                term: req.body.term,
                definition: req.body.definition,
            }
            // Add to comments array
            deck.cards.unshift(newCard);
            //save
            deck.save().then(deck => res.json(deck))
        })
        .catch(err => res.status(404).json({ decknotfound: 'No deck found' }));
});

//@route    DELETE api/decks/:id
//@desc     DELETE deck
//@access   private
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Deck.findById(req.params.id)
                .then(deck => {
                    // Check for deck owner
                    if (deck.user.toString() !== req.user.id) {
                        return res
                            .status(401)
                            .json({ notauthorized: 'User not authorized' });
                    }

                    // Delete
                    deck.remove().then(() => res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ decknotfound: 'No deck found' }));
        });
    }
);

//@route    POST api/decks/like/:id
//@desc     Like deck
//@access   private
router.post(
    '/like/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Deck.findById(req.params.id)
                .then(deck => {
                    if(deck.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({ alreadyliked: 'User already liked this deck' });
                    }
                    //add user id to the likes array.
                    deck.likes.unshift({ user: req.user.id});
                    deck.save().then(deck => res.json(deck))
                })
                .catch(err => res.status(404).json({ decknotfound: 'No deck found' }));
        });
    }
);
//@route    POST api/decks/unlike/:id
//@desc     Like deck
//@access   private
router.post(
    '/unlike/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Deck.findById(req.params.id)
                .then(deck => {
                    if (deck.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({ notliked:'You have not liked this deck' });
                    }
                    // Get remove index
                    const removeIndex = deck.likes
                    .map(item => item.user.toString())
                    .indexOf(req.user.id);

                    //Splice out of array
                    deck.likes.splice(removeIndex, 1);
                    deck.save().then(deck => res.json(deck));
                })
                .catch(err => res.status(404).json({ decknotfound: 'No deck found' }));
        });
    }
);

//@route    POST api/decks/comment/:deck_id
//@desc     Add comment to deck
//@access   Private
router.post('/comment/:deck_id', passport.authenticate('jwt', {session: false}), (req,res) => {
    const { errors, isValid } = validateDeckInput(req.body);

    //Check validation
    if (!isValid) {
        // if any errors, send 400 with errors object
        return res.status(400).json(errors)
    }

    Deck.findById(req.params.deck_id)
        .then(deck => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }
            // Add to comments array
            deck.comments.unshift(newComment);

            //save
            deck.save().then(deck => res.json(deck))
        })
        .catch(err => res.status(404).json({ decknotfound: 'No deck found' }));
})

//@route    DELETE api/decks/comment/:deck_id/:comment_id
//@desc     deletes a comment to deck
//@access   Private
router.delete('/comment/:deck_id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Deck.findById(req.params.deck_id)
        .then(deck => {
            //Check to see if comment exists
            if (deck.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                return res.status(404).json({commentnotexists: 'Comment does not exist'});
            }
            //Get remove index
            const removeIndex = deck.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id);
            // Splice comment out of array
            deck.comments.splice(removeIndex, 1);

            deck.save().then(deck => res.json(deck))
        })
        .catch(err => res.status(404).json({ decknotfound: 'No deck found' }));
})


module.exports = router;