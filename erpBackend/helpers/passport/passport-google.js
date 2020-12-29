const passport = require("passport");
const Admin = require("../../models/adminModel");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //   profileFields: ["email", "displayName", "photos"],
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      console.log(req.user);
      if (!req.user) {
        console.log(profile);
        Admin.findOne({ provider: "google", uid: profile.id }, (err, user) => {
          if (err) {
            console.log(err);

            return done(err);
          }
          if (user) {
            return done(null, user);
          } else {
            return done("You are not authorized");
          }
        });
      } else {
        Admin.findByIdAndUpdate(req.user._id, {
          provider: "google",
          uid: profile.id,
        })
          .then((user) => {
            return done(null, user);
          })
          .catch((err) => {
            return done(err);
          });
      }
    }
  )
);
