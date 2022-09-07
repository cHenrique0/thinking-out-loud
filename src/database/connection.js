const { Sequelize } = require("sequelize");
const Thought = require("../models/Thought");
const User = require("../models/User");
const UserPicture = require("../models/UserPicture");
const dbConfig = require("./config/config");

const connection = new Sequelize(dbConfig);

/* Initializing the models */
User.init(connection);
UserPicture.init(connection);
Thought.init(connection);

/* Models relationships */
Thought.belongsTo(User);
User.hasMany(Thought);
UserPicture.belongsTo(User);
User.hasOne(UserPicture);

connection
  .authenticate()
  .then(() => console.log(`* Database successfully connected.`))
  .catch((error) => console.log(error));

module.exports = connection;
