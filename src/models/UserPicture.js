const { Model, DataTypes } = require("sequelize");

class UserPicture extends Model {
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
        path: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        ext: {
          type: DataTypes.STRING,
          defaultValue: true,
        },
      },
      {
        sequelize: connection,
        tableName: "user_picture",
      }
    );
  }
}

module.exports = UserPicture;
