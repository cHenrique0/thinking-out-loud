const { Model, DataTypes } = require("sequelize");
const connection = require("../database/connection");
const User = require("./User");

class Thought extends Model {}

Thought.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: "thoughts",
  }
);

Thought.belongsTo(User);
User.hasMany(Thought);

module.exports = Thought;
