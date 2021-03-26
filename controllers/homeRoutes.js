const router = require("express").Router();
const { Blog, User, Comment } = require("../models");

const isAuthenticated = require("../utils/auth");

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: { user_id: req.session.user_id },
      attributes: ["id", "title", "message"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "post_id", "user_id", "message"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("blog", {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/", (req, res) => {
  res.render("login");
});

router.get("blog/:id", isAuthenticated, async (req, res) => {
  try {
    const userData = await Blog.findByPk({
      where: { id: req.params.id },
      include: [
        {
          model: User,
          attributes: "username",
        },
        {
          model: Comment,
          attributes: ["id", "post_id", "user_id", "message"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    const blog = userData.get({ plain: true });
    res.render("blog", { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/user", isAuthenticated, async (req, res) => {
  try {
    const userData = await User.findByPk({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Blog,
        },
      ],
    });
    const user = userData.get({ plain: true });
    res.render("user", {
      ...user,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect("/");
  //   return;
  // }

  res.render("login");
});

router.get("/signup", isAuthenticated, async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
