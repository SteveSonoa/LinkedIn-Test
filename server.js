// Require the necessary packages
var express = require('express');
var bodyParser = require('body-parser');
var Linkedin = require('node-linkedin')('86iqdrrwi4ttfs', 'Mi8cFFT1VKvypzTu', 'https://linkedin-api-test.herokuapp.com/');

var PORT = process.env.PORT || 3000;
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
// Again, `res` is optional, you could pass `code` as the first parameter 
app.get('/oauth/linkedin/callback', function(req, res) {
    Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {
        if ( err )
            return console.error(err);
 
        /**
         * Results have something like:
         * {"expires_in":5184000,"access_token":". . . ."}
         */
 
        console.log(results);
        return res.redirect('/');
    });
});

require("./controllers/burgers_controller.js")(app);

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
