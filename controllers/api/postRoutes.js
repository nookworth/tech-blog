const router = require("express").Router();
const { Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to create a new post
router.post("/", withAuth, async (req, res) => {
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

// Route to add a comment to a post
router.post("/:id", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      text: req.body.text,
      user_id: req.session.user_id,
      post_id: req.params.id,
    });

    res.status(200).json(newComment);

    res.render("comments", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to update/edit a post (apart from adding a comment)
router.put("/:id", withAuth, async (req, res) => {
  try {
    const postToUpdate = await Post.findByPk(req.params.id);
    const updatedPost = postToUpdate.set({
      title: req.body.title,
      text: req.body.text,
    });

    await updatedPost.save();

    if (!updatedPost) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to delete a post
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByPk(req.params.id);
    await deletedPost.destroy();

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
