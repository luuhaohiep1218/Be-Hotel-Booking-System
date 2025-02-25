const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");

const db = require("./config/db");
const { errorHandle } = require("./middlewares/errorMiddleware");

const authRouter = require("./routes/authRouter");
const uploadRouter = require("./routes/uploadRouter");
const feedbackRouter = require("./routes/feedbackRouter");
const userRouter = require("./routes/userRouter");

const User = require("./models/UserModel");

dotenv.config({
  path: __dirname + "/.env",
});

db.connect();

const app = express();

// app.use(morgan("combined"));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
)

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const full_name = profile.displayName;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            full_name,
            email,
            authProvider: "google",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send("Hello World!dasdasd");
});

app.use("/api/auth", authRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/user", userRouter);

app.use(errorHandle);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
