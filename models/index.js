const Blog = require("./blog");
const Comment = require("./comment");
const User = require("./user");

Blog.belongsTo(User);

Comment.belongsTo(Blog);

Comment.belongsTo(User);

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Blog, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Blog.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

module.exports = { User, Blog, Comment };
