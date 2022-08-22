const dotenv = require("dotenv");
const express = require("express");
const { engine } = require("express-handlebars");
const dbConnection = require("./database/connection");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

dotenv.config();

const app = express();
const port = process.env.APP_PORT;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Session middleware
app.use(
  session({
    name: "session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

// Flash messages
app.use(flash);

// Set session to response
app.use((request, response, next) => {
  if (request.session.userid) {
    response.locals.session = request.session;
  }

  next();
});

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
