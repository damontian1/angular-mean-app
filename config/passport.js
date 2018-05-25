const User = require('../models/user');
const { Strategy, ExtractJwt } = require("passport-jwt");
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret"
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, (payload, done) => {
      User.findById(payload.id)
        .then(user => user ? done(null, user) : done(null, false))
    })
  )
}