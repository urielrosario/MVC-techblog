const router = require("express").Router();
const { Blog } = require("../../models");
const isAuthenticated = require("../../utils/auth");

router.post("/", isAuthenticated, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      message: req.body.message,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const blogData = await Blog.update(
      {
        title: req.body.title,
        message: req.body.message,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (!blogData) {
      res.status(404).json({ message: "we cant find the post with this ID" });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post
router.delete("/:id", async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: { id: req.params.id },
    });
    if (!blogData) {
      res.status(404).json({ message: "no post found with this ID" });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
