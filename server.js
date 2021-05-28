const express = require('express');
const mongoose = require('mongoose');
// const passport = require('passport');
const dotenv = require("dotenv");

const bodyParser = require('body-parser');
const cors = require("cors");
const UserRoutes = require('./routes/user');



dotenv.config();

//Database connection
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;


//Using middlewares
const App = express();

App.use(bodyParser.urlencoded({extended: true}));

App.use(cors(
    {
        origin: "*", // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true // allow session cookie from browser to pass through
    }
));

App.use('/user', UserRoutes);

App.listen(process.env.PORT, () => {
  console.log('Server started.')
});