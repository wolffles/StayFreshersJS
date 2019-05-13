const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCardInput(data) {
  let errors = {};

  data.term = !isEmpty(data.term) ? data.term : "";
  data.definition = !isEmpty(data.definition) ? data.definition : "";

  if (Validator.isEmpty(data.term)) {
    errors.term = "Terms can't be blank";
  }

  if (Validator.isEmpty(data.definition)) {
    errors.definition = "Definitions can't be blank";
  }
  
  return {
    errors, //errors: errors
    isValid: isEmpty(errors)
  };
};
