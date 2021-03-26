const { User } = require("../models");

const userData = [
  {
    username: "uriel rosario",
    email: "urielrosario1010@gmail.com",
    password: "uriel123",
  },
  {
    username: "michael jackson",
    email: "michaeljackson@gmail.com",
    password: "thriller123",
  },
  {
    username: "tom jerry",
    email: "tomandjerry@gmail.com",
    password: "tomandjerry123",
  },
];
const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
