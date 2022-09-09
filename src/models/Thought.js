const { Model, DataTypes } = require("sequelize");

class Thought extends Model {
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
  }
}

module.exports = Thought;
