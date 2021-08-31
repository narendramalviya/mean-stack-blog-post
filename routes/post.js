const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const postController = require("../controllers/post");

// get post by id
// post user
// update post
// delete post
// router.param("userid", getUserById);
router.param("postid", postController.getById);
router.param("userid", userController.getUserById);
// get post by id
router.get("/post/:postid", (req, res) => {
  return res.status(200).json({
    data: req.post,
    message: "post data",
  });
});
// create new user
router.post(
  "/post/:userid",
  authController.isSignedIn,
  authController.isAuthenticated,
  postController.upload.single("photo"),
  check("title", "title should be at least 3 char").isLength({ min: 3 }),
  check("content", "content should be at least 3 char").isLength({ min: 3 }),
  postController.create
);
// get all by user
router.get("/posts/:userid", postController.getAllByUser);
router.get("/posts", postController.getAll);

// update user by admin
// router.put(
// 	"/user/:userid",
// 	check("firstName", "name should be at least 3 char").isLength({ min: 3 }),
// 	check("lastName", "name should be at least 3 char").isLength({ min: 3 }),
// 	check("email", "email is required").isEmail(),
// 	check("password", "password should be at least 3 char").isLength({
// 		min: 3,
// 	}),
// 	check("phone", "phone number should be at least 10 char").isLength({
// 		min: 10,
// 	}),
// 	isSignedIn,
// 	isAdmin,
// 	updateUser
// );
// router.delete("/user/:userid",isSignedIn,isAdmin,deleteUser);

module.exports = router;
