// Require the necessary packages
var express = require('express');
var bodyParser = require('body-parser');
var Linkedin = require('node-linkedin')('86iqdrrwi4ttfs', 'Mi8cFFT1VKvypzTu');

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
app.get('/auth', function (req, res) {
    // This is the redirect URI which linkedin will call to and provide state and code to verify
    /**
     *
     * Attached to the redirect_uri will be two important URL arguments that you need to read from the request:

     code — The OAuth 2.0 authorization code.
     state — A value used to test for possible CSRF attacks.
     */
  

    //TODO: validate state here to secure against CSRF
    var error = req.query.error;
    var error_description = req.query.error_description;
    var state = req.query.state;
    var code = req.query.code;
    if (error) {
        next(new Error(error));
    }
    /**
     *
     * The code is a value that you will exchange with LinkedIn for an actual OAuth 2.0 access
     * token in the next step of the authentcation process.  For security reasons, the authorization code
     * has a very short lifespan and must be used within moments of receiving it - before it expires and
     * you need to repeat all of the previous steps to request another.
     */
    //once the code is received handshake back with linkedin to send over the secret key
    handshake(req.query.code, res);
});

function handshake(code, ores) {

    //set all required post parameters
    var data = querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: OauthParams.redirect_uri,//should match as in Linkedin application setup
        client_id: OauthParams.client_id,
        client_secret: OauthParams.client_secret// the secret
    });

    var options = {
        host: 'www.linkedin.com',
        path: '/oauth/v2/accessToken',
        protocol: 'https:',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };
    
    var req = http.request(options, function (res) {
         var data = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            data += chunk;

        });
        res.on('end', function () {
            //once the access token is received store in DB
            insertTodb(JSON.parse(data), function (id) {
                //need to find better way and proper authetication for the user
                ores.redirect('http://localhost:3000/dashboard/' + id);
            });
        });
        req.on('error', function (e) {
            console.log("problem with request: " + e.message);
        });

    });
    req.write(data);
    req.end();


}

require("./controllers/burgers_controller.js")(app);

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
