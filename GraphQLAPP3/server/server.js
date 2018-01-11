const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')

const models = require('./models')
const schema = require('./schema/auth')
const passportConfig = require('./services/auth')
const webpackConfig = require('../webpack.config.js')

// URI for Database
const MONGO_URL = '';
const app = express();

// Connecting to mongoDB. Error and Success handling.
mongoose.Promise = global.Promise
mongoose.connect(MONGO_URL);
mongoose.connection
    .once('open', () => console.log('connected to mongoDB'))
    .on('error', error => console.log('error connecting to mongoDB', error))

// Configuring express to uses sessions.
// The session cookie contians the id of the session. More information is stored inside of mongoDB
app.use(sessions({
    resave: true,
    saveUninitialized: true,
    secret: 'qwerty1234',
    store: new MongoStore({
        url: MONGO_URL,
        autoReconnect: true
    })
}))

// Passport is wired into express as a middleware. When a request comes in, Passport will examine the request's session (as set by the above config) and assign the current user to the 'req.user' object. 
app.use(passport.initialize());
app.use(passport.session());

// instructing express to pass on any request to '/graphql
app.use('/graphql', expressGraphQL({
    schema: schema,
    graphql: true
}))

// running the webpack as a miiddleware. processes requests to the root route ('/') and will respond with an HTML file and single bundled Javascript file.
app.use(webpackMiddleware(webpackConfig))

module.exports= app;