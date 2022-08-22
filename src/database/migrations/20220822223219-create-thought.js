"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("thoughts", {
      uuid: {
        type: Sequelize.DataTypes.UUID,
        defaultType: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
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
    await queryInterface.dropTable("thoughts");
  },
};
