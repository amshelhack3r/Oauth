const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("./keys");
const User = require("../models/User");
module.exports = passport => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.google_auth.clientID,
        clientSecret: keys.google_auth.clientSecret,
        callbackURL: keys.google_auth.callback
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ oauth_id: profile.id }).then(user => {
          if (user) {
            done(null, user);
          } else {
            //remove the sive limitation
            const image = profile.photos[0].value.substring(
              0,
              profile.photos[0].value.indexOf("?")
            );
            new User({
              oauth_id: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              avatar: image,
              desc: "logged in with google"
            })
              .save()
              .then(user => done(null, user));
          }
        });
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: keys.facebook_auth.clientID,
        clientSecret: keys.facebook_auth.clientSecret,
        callbackURL: keys.facebook_auth.callback,
        profileFields: ["id", "displayName", "photos", "email"]
      },
      function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        // console.log(profile.photos[0].value);
        User.findOne({ oauth_id: profile.id })
          .then(user => {
            if (user) {
              done(null, user);
            } else {
              new User({
                oauth_id: profile.id,
                name: profile.displayName,
                avatar: profile.photos[0].value,
                desc: "logged in with facebook"
              })
                .save()
                .then(user => done(null, user));
            }
          })
          .catch(err => console.log(err));
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
