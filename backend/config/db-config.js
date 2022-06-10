const { Sequelize } = require("sequelize");

const db = new Sequelize("groupomania", "root", "Hercules55", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
