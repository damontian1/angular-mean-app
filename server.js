const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/keys');
const User = require('./models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const path = require('path');

const port = process.env.port || 5000;

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("mongodb connected!"))
  .catch(err => console.log(err.message))

const app = express();

// // middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(passport.initialize());
require('./config/passport')(passport);

app.use(express.static("./public"));

// ROUTES

// GET list all users
app.get("/users", (req, res) => {
  User.find()
    .then(data => res.json(data))
})

// POST register user
app.post("/users/register", (req, res) => {
  const { name, email, username, password } = req.body;
  const newUser = new User({
    name, email, username, password
  })
  User.addUser(newUser, (err, data) => {
    if (err) return res.json(err)
    res.json({msg: "user registered", data})
  })
})

// POST login user
app.post("/users/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (!user) return res.json({success: false, msg: "user not found!"})
    bcryptjs.compare(password, user.password)
      .then((isMatch) => {
        if (!isMatch) return res.json({success: false, msg: "wrong password"})
        jwt.sign({ id: user.id, name: user.name, email: user.email  }, "secret", (err, token) => {
          res.json({success: true, token: `Bearer ${token}`})
        });
      })
  })
})

// GET user profile protected route
app.get("/users/profile", passport.authenticate("jwt", {session: false}), (req, res) => {
  res.json(req.user)
})

// send non-existent routes to default route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"))
})

app.listen(port, () => console.log(`http://localhost:${port}`))