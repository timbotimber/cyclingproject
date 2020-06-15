require('dotenv').config();
const compression = require('compression');
const cors = require('cors');
require('./db'); // will run the code in `./db/index.js` (which is the database connection logic)
require('./passport');

const express = require('express');
const logger = require('morgan');

const app = express();

app.use(compression());

app.use(express.urlencoded({ extended: true })); // sets the `body` object in the `request` with the values from an HTML POST form

app.use(express.json()); // sets the `body` object in the `request` with the data coming from a request with a `body` (request we'll issue with axios, fetch...)

app.use(express.static('client/build'));

app.use(logger('dev')); // this middleware will log every response that is issued (with the status code) in the console

require('./session')(app);

const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

// Don't redirect if the hostname is `localhost:port` or the route is `/insecure`
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

// Allow cross-origin
app.use(cors());

const routes = require('./routes'); // this is our controller and will manage all the routes so we don't have to register any new route handler here
app.use(routes);

app.use((req, res) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + '/client/build/index.html');
});

app.listen(process.env.PORT, () => {
  console.log(`Express server listening to: ${process.env.PORT}`);
});
