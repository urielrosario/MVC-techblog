const { Blog } = require("../models");

const blogData = [
  {
    title: "Lets talk about HTML",
    user_id: 1,
    message: "HTML is the structure of the webpage",
  },
  {
    title: "Lets talk about about Javascript",
    user_id: 2,
    message: "JavaScript is single threaded.",
  },
];

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;
