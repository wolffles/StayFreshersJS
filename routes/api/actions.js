const express = require('express');
const router = express.Router();
const passport = require('passport');

const Feedback = require('../../models/Feedback');

router.get('/', (req,res) => {
  Feedback.find()
    .sort({date:-1})
    .then(feedback => res.json(feedback))
    .catch(err => res.status(404).json({nofeedback: "No feedback found"}))
})

router.post('/', passport.authenticate('jwt', {session:false}), (req,res) => {
  const newFeedback = new Feedback({
    user: req.user.id,
    name: req.body.name,
    handle: req.body.handle,
    feedback: req.body.feedback,
    avatar: req.body.avatar
  })
  newFeedback.save().then(result => {
    res.json(result)
  })
})

router.delete('/:feedback_id', passport.authenticate('jwt', { session: false }), (req, res)=>{
  Feedback.findByIdAndDelete(req.params.feedback_id)
    .then(() => res.json({msg: "Feedback Deleted"}))
    .catch(err => res.status(404).json({nofeedback: "No feedbackfound"}))
})

module.exports = router