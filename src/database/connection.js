const { Sequelize } = require("sequelize");
const dbConfig = require("./config/config");

const connection = new Sequelize(dbConfig);

connection
  .authenticate()
  .then(() => console.log(`* Database successfully connected.`))
  .catch((error) => console.log(error));

module.exports = connection;
