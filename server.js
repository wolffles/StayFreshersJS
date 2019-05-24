const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path') // part of nodejs

const users = require("./routes/api/users");
const decks = require("./routes/api/decks");
const profile = require("./routes/api/profile");
const actions = require("./routes/api/actions");

const app = express();

//bodyparser middleware
//express now has a json parser in it.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//DB config
const db = require('./config/keys').mongoURI

//Connect to MongoDB
mongoose.connect(db, {useNewUrlParser:true})
    .then(()=> console.log('mongodb connected'))
    .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

//Use Routes .use is a method to use when you want to include middleware
app.use('/api/users', users);
app.use('/api/decks', decks);
app.use('/api/profile', profile);
app.use('/api/actions', actions);
// if none of these api routes are being hit, look for index
// Server static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder to client/build
    app.use(express.static('client/build'));
    // any route gets hit here load the react html file in build
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// module.exports = app 