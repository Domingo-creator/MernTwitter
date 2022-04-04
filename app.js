const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI;
const passport = require('passport');



mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));

const app = express();

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

app.use(passport.initialize());
require('./config/passport')(passport);

const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/tweets", tweets);

app.listen(port, () => console.log(`Server is running on port ${port}`));

