var express = require('express');
var router = express.Router();
const passport = require('passport');
/* GET home page. */
router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

router.get('/cb',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get('/facebook',
    passport.authenticate('facebook'));

router.get('/cb2',
    passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    });
module.exports = router;