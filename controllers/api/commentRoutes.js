const router = require("express").Router();
const { Comment } = require("../../models");
const isAuthenticated = require("../../utils/auth");

// get all
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: Painting,
          attributes: ["filename"],
        },
      ],
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render("homepage", {
      comments,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  // const commentData = await Comment.findAll().catch((err) => {
  //     res.json(err);
  // });
  // const comments = commentData.map((comment) => comment.get({plain: true}));
  // res.render('all',{comments});
});
// get by id
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const commentData = await Comment.findByPk({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// post comment
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// delete comment
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
