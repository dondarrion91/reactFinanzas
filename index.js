// npm packages
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// app module
app = express();

// db connection
const db = require('./config/db');
const Users = require('./models/Users');
db.sync() 
  .then(() => console.log("DB OK"))
  .catch(error => console.log(error));


// modules
const routes = require('./routes/index');

// bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// morgan
app.use(morgan('dev'));

// routes
app.use('/',routes());

// Server start
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port,host,() => {
    console.log(`Server on port ${port}`);
});