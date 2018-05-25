const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {type: String},
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("users", UserSchema)

module.exports.addUser = (newUser, callback) => {
  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save(callback)
    });
  });
}
