const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateDeckInput(data) {
  let errors = {};

  data.subject = !isEmpty(data.subject) ? data.subject : "";
  // data.text = !isEmpty(data.text) ? data.text : "";

  if (Validator.isEmpty(data.subject)) {
    errors.subject = "subject can't be blank";
  }

  // if (Validator.isEmpty(data.subject)) {
  //   errors.subject = "Comments can't be blank";
  // }

  // if (!Validator.isLength(data.text, {min:10, max:300})) {
  //   errors.text = "comment must be between 10 and 300 characters";
  // }
  return {
    errors, //errors: errors
    isValid: isEmpty(errors)
  };
};
