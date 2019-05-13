
const {assert} = require('chai');
const supertest = require('supertest');
const app = require('../server');

describe ('The routes for decks.js', () => {
  describe('#GET all decks, path @ /', () => {
    it('Responds with array object', (done) => {
      supertest(app)
        .get('/api/decks/')
        .expect(200)
        .end((err,res) => {
          if (err) {
            return done(err);
          }
          assert.typeOf(res.body, 'array', 'should return array of decks');
          done()
        })
    })

    // it('Responds with 200 status code', (done) => {
    //   supertest(app)
    //     .get('/api/decks/')
    //     .end((err,res) => {
    //       assert.equal(res.statusCode, '200', 'should return success 200')
    //     })
    // })
  })
})

