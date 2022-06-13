const DataTypes = require("sequelize");
const db = require("../config/db-config");
// // // const sequelize = new Sequelize("sqlite::memory:");

const Post = db.define(
  "Post",
  {
    // Model attributes are defined here
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    articleUrl: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {}
);

Post.associate = function (models) {
  models.Post.belongsTo(models.User, {
    foreignKey: {
      allowNull: false,
      name: "usersId",
    },
  });
};

async () => {
  await Post.sync({ alter: true });
  console.log("The table for the User model was just (re)created!");
};

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

module.exports = Post;
