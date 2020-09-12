const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { OAUTH_CLIENT_ID, CLIENT_SECRET } = require('../../config');
const { User } = require('../db');

passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

passport.deserializeUser(async (googleId, done) => {
  const user = await User.findOne({ where: { googleId } });
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: OAUTH_CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: '/auth/google/redirect',
    },
    async (accessToken, refreshToken, profile, done) => {
      const { familyName, givenName } = profile.name;
      let user = await User.findOne({ where: { googleId: profile.id } });
      if (!user) {
        user = await User.create({
          first_name: givenName,
          last_name: familyName,
          email: profile.emails[0].value,
          profile_pic: profile.photos[0].value,
          host: false,
          googleId: profile.id,
        });
      }
      done(null, user);
    },
  ),
);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

module.exports = router;
