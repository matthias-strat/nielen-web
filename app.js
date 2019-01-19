"use strict";

// include node modules
const createError   = require("http-errors"),
      express       = require("express"),
      path          = require("path"),
      cookieParser  = require("cookie-parser"),
      morgan        = require("morgan"),
      mongoose      = require("mongoose");

// include user modules
const config        = require("./app.config"),
      router        = require("./app.router");

// initialize express
const app           = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use router
router(app);

// connect to mongoose
const mongooseOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
};

mongoose.Promise = global.Promise;
mongoose.connect(config.database, mongooseOptions).then(
  () => {
    console.log("connection to MongoDB established");

    // Start express and listen on either process.env.PORT (if set) or on
    // default port 3030
    let server = app.listen(config.port, () => {
      const port = server.address().port;
      console.log("The server is now listening on port", port);
    })
  },
  err => { console.log("could not connect to MongoDB " + err); }
);

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));