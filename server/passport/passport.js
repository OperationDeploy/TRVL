const passport = require('passport');
const GoogleStrategy = require('passport-oauth2');
const { OAUTH_CLIENT_ID, CLIENT_SECRET } = require('../../config');

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/redirect',
      clientID: OAUTH_CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    },
    () => {
      // passport callback
    },
  ),
);
