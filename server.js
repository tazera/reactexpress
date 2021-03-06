require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./utils');
const path = require('path');
const app = express();




const port = process.env.PORT || 5000;
// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/client/build"));

console.log(port);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


var admin = require("firebase-admin");

var serviceAccount = require("./location-39d1f-firebase-adminsdk-qaydn-2387e03a78.json");

// credetntial
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://location-39d1f-default-rtdb.firebaseio.com"
});

// db initinalization
const db = admin.firestore();




app.get('/api/locations', async(req, res) => {
  let locations = [];
   db.collection('location').get().then((snapshot) => {
    snapshot.docs.forEach(doc =>{
      locations.push(doc.data());
    });
    return res.send(locations);
   })
});


// static user details for tests later should be changed from the db
const userData = {
  userId: "789789",
  password: "1234",
  name: "Lyubo",
  username: "tazera",
  isAdmin: true
};




 


//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next(); //if no token, continue 

  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});



// validate the user credentials
app.post(`${process.env.PORT}/api/users/signin`, function (req, res) {
  const user = req.body.username;
  const pwd = req.body.password;

  // return 400 status if username/password is not exist
  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password required."
    });
  }

  // return 401 status if the credential is not match.
  if (user !== userData.username || pwd !== userData.password) {
    return res.status(401).json({
      error: true,
      message: "Username or Password is Wrong."
    });
  }

  // generate token
  const token = utils.generateToken(userData);
  // get basic user details
  const userObj = utils.getCleanUser(userData);
  // return the token along with user details
  return res.json({ user: userObj, token });
});


// verify the token and return it if it's valid
app.get('/api/verifyToken', function (req, res) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });

    // return 401 status if the userId does not match.
    if (user.userId !== userData.userId) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    }
    // get basic user details
    var userObj = utils.getCleanUser(userData);
    return res.json({ user: userObj, token });
  });
});

// alternative routing if everything else doesnt catch it
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});


// just a listener 
app.listen(port, () => {
  console.log('Server started on: ' + port);
});






