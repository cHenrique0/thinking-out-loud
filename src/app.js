const dotenv = require("dotenv");
const express = require("express");
const { engine } = require("express-handlebars");
const dbConnection = require("./database/connection");
const session = require("express-session");
const FileStore = require("session-file-store");
const flash = require("express-flash");

dotenv.config();
FileStore(session);

const app = express();
const port = process.env.APP_PORT;

dbConnection
  .sync()
  .then((conn) => {
    console.log(`* [${conn.getDatabaseName()}] database synced successfully`);

    app.listen(port, () => {
      console.log(`* Application is runnig at port: [${port}]`);
      console.log(`* Click here to use: http://localhost:${port}/`);
    });
  })
  .catch((error) => console.log(error));
