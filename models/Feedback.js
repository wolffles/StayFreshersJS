const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref:'users'
  },
  avatar: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }

})

module.exports = Feedback = mongoose.model('feedback', FeedbackSchema);