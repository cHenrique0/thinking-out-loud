"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_image", {
      uuid: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      path: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
        allowNull: true,
      },
      ext: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      user_uuid: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "users",
          key: "uuid",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_image");
  },
};
