require("dotenv").config();

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOSTNAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
  seederStorage: "sequelize",
  seederStorageTableName: "SequelizeDataSeed",
  define: {
    underscored: true,
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
