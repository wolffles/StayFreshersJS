const {assert} = require('chai');
const validateCardInput = require('../validation/card');
const validateDeckInput = require('../validation/deck');
const isEmpty = require('../validation/is-empty');

const data = {
  string: "I am a string",
  card: {
    term: "term",
    definition: "definition"
  },
  deck: {
    subject: "testing"
  } 
}

describe ('All Validations',() => {
  describe('isEmpty()', () => {
    let result = isEmpty(data.string)
    it('it should be true', () => {
      assert.isFalse(result, "function checks if value is empty");
    })
    it('should be an boolean', () => {
      assert.typeOf(result, 'boolean', "it is not a boolean");
    })
  })
  describe('card validation', ()=>{
    let result = validateCardInput(data.card)
    it('should validate the card input', () => {
      assert.isTrue(result.isValid, "it should be true");
    })
    it('should be an object',()=>{
      assert.typeOf(result,'object', "it is not an object");
    })
  })

  describe('deck validation', () => {
    let result = validateDeckInput(data.deck)
    it('should validate the dekc input', () => {
      assert.isTrue(result.isValid, "it should be true");
    })
    it('should be an object', () => {
      assert.typeOf(result, 'object', "it is not an object");
    })
  })
})



