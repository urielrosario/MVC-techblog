const { Comment } = require("../models");

const commentData = [
  {
    user_id: 1,
    message: "HTML is the structure of the webpage",
  },
];
const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
