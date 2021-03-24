const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequilize");

class Blog extends Model {}

Blog.init({
  title: {
    type: DataTypes.STRING,
  },
});
