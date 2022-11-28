const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");

// Prevent non logged in users from viewing the homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: {
        include: [
          "id",
          "title",
          "text",
          "date",
          [
            sequelize.fn("DATE_FORMAT", sequelize.col("date"), "%a, %b %D, %Y"),
            "date",
          ],
        ],
      },
      order: [["date", "DESC"]],
    });

    const posts = postData.map((project) => project.get({ plain: true }));

    res.render("homepage", {
      posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
    console.log(user);

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard/:id", async (req, res) => {
  try {
    // const postData = await Post.findOne({
    //   where: { id: req.params.id },
    //   include: [User],
    // });

    const postData = await Post.findByPk(req.params.id, {
      attributes: {
        include: [
          "id",
          "title",
          "text",
          "date",
          [
            sequelize.fn("DATE_FORMAT", sequelize.col("date"), "%a, %b %D, %Y"),
            "date",
          ],
        ],
      },
    });

    const post = postData.get({ plain: true });

    res.render("editPost", {
      post,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/comments/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      include: [User],
    });

    const post = postData.get({ plain: true });
    console.log("Here!!!!!!!", postData.toJSON());

    res.render("comments", {
      post,
      // ...post,
      // logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
