const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        text: req.body.text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updatedPost) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findOne(
      {
        where: {
          id: req.params.id,
        },
      },
      deletedPost.destroy()
    );

    if (!deletedPost) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
