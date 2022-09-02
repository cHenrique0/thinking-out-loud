const { Model, DataTypes } = require("sequelize");
const connection = require("../database/connection");
const User = require("./User");

class UserImage extends Model {}

UserImage.init(
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
    tableName: "user_image",
  }
);

UserImage.belongsTo(User);
User.hasOne(UserImage);

module.exports = UserImage;
