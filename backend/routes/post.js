const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { isSignedIn, isAuthenticated ,isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");
const {
	getAllPostByUser, getPostById
} = require("../controllers/post");

// get post by id
// post user
// update post
// delete post
// router.param("userid", getUserById);
router.param("postid", getPostById);
// get user by id
router.get("/post/:postid/:userid",(req, res) => {
	if (!req.post) {
		return res.status(404).json({
			status:404,
			data: {},
			message:"no post data found",
			error:''
		});
	}
	return res.status(200).json({ 
			status:200,
			data: req.post,
			message:"post data",
			error:''
		 });
});
// get all users
router.get("/posts/:userid", getAllPostByUser);
// create new user
// router.post(
// 	"/user",
// 	check("firstName", "name should be at least 3 char").isLength({ min: 3 }),
// 	check("lastName", "name should be at least 3 char").isLength({ min: 3 }),
// 	check("email", "email is required").isEmail(),
// 	check("password", "password should be at least 3 char").isLength({
// 		min: 3,
// 	}),
// 	check("phone", "phone number should be at least 10 char").isLength({
// 		min: 10,
// 	}),
// 	createUser
// );
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