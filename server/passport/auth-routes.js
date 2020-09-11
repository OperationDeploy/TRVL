const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { OAUTH_CLIENT_ID, CLIENT_SECRET } = require('../../config');

passport.use(new GoogleStrategy({
  clientID: OAUTH_CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: '/auth/google/redirect',
},
((accessToken, refreshToken, profile, done) => {
  // User.findOrCreate({ googleId: profile.id }, (err, user) => done(err, user));
})));

router.get('/google', passport.authenticate('google', {
  scope: ['profile'],
}));

router.get('/google/redirect', (req, res) => {
  res.send('You reached callback URI');
});

module.exports = router;
