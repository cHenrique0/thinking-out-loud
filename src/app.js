const dotenv = require("dotenv");
const express = require("express");
const formatDate = require("handlebars-dateformat");
const { engine } = require("express-handlebars");
const dbConnection = require("./database/connection");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
const path = require("path");
const thoughtRouter = require("./routes/thoughtRoutes");
const auhtRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const uploadRouter = require("./routes/uploadRoutes");
const indexRouter = require("./routes/indexRoutes");

dotenv.config();

const app = express();
const port = process.env.APP_PORT;

app.engine(
  "handlebars",
  engine({
    helpers: { dateFormat: formatDate },
    // defaultLayout: "main", // opitional
    // extname: "hbs",  // define file extension
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/uploads/users/pictures"));

// Session middleware
app.use(
  session({
    name: "session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: path.join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  })
);

// Flash messages
app.use(flash());

// Set session to response
app.use((request, response, next) => {
  if (request.session.userid) {
    response.locals.session = request.session;
  }

  next();
});

app.use("/", auhtRouter);
app.use("/thoughts", thoughtRouter);
app.use("/user", userRouter);
app.use("/picture", uploadRouter);
app.use(indexRouter);

dbConnection
  .sync()
  .then((conn) => {
    console.log(`* [${conn.getDatabaseName()}] database synced successfully`);

    app.listen(port, () => {
      console.log(`* Application is running at port: [${port}]`);
      console.log(`* Click here to use: http://localhost:${port}/`);
    });
  })
  .catch((error) => console.log(error));
