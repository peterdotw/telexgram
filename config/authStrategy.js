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
        console.log("Incorrect username");
        return done(null, false, {
          message: "Incorrect username",
        });
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          console.log("Incorrect pass");
          return done(null, false, { message: "Incorrect password" });
        }
      });
    });
  }
);

module.exports.authStrategy = authStrategy;
