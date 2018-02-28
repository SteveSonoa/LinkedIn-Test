// Require the necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const Linkedin = require('node-linkedin')('86iqdrrwi4ttfs', 'Mi8cFFT1VKvypzTu');
const querystring = require('querystring');
const OauthParams = require('./config/OauthParams.js');
const fs = require('fs');
const http = require('https');

const PORT = process.env.PORT || 3000;
const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
require("./controllers/linkedin_controller.js")(app);
require("./controllers/burgers_controller.js")(app);

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});