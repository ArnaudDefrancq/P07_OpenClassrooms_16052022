const DataTypes = require("sequelize");
const db = require("../config/db-config");
// const sequelize = new Sequelize("sqlite::memory:");

const User = db.define(
  "User",
  {
    // Model attributes are defined here
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    pseudo: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isAdmin: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  },
  {
    // Other model options go here
  }
);

User.associate = function (models) {
  models.User.hasMany(models.Post);
};

async () => {
  await User.sync({ alter: true });
  console.log("The table for the User model was just (re)created!");
};

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

module.exports = User;
