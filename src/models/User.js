const { Model, DataTypes } = require("sequelize");
const connection = require("../database/connection");

class User extends Model {
  static init(connection) {
    super.init(
      {
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        about: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        facebook: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        twitter: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize: connection,
        tableName: "users",
      }
    );
  }
}

module.exports = User;
