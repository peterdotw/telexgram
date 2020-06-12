const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const authStrategy = new LocalStrategy(
  { usernameField: "login" },
  (login, password, done) => {
    User.findOne({
      login: login,
    }).then((user) => {
      if (!user) {
        return done(null, false);
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        }

        return done(null, false);
      });
    });
  }
);

module.exports.authStrategy = authStrategy;
