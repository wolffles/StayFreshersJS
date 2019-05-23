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
  },
  date: {
    type: Date,
    default: Date.now
  }

})

module.exports = Feedback = mongoose.model('feedback', FeedbackSchema);