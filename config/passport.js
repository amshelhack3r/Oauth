const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys');
module.exports = (passport) => {

    passport.use(new GoogleStrategy({
            clientID: keys.google_auth.clientID,
            clientSecret: keys.google_auth.clientSecret,
            callbackURL: keys.google_auth.callback
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(profile);


        }
    ));

    passport.use(new FacebookStrategy({
            clientID: keys.facebook_auth.clientID,
            clientSecret: keys.facebook_auth.clientSecret,
            callbackURL: keys.facebook_auth.callback,
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        function (accessToken, refreshToken, profile, cb) {
            console.log(profile);
        }
    ));
}