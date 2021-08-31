const Post = require("../models/post");
const File = require("../models/file");
const { check, validationResult } = require("express-validator");
const multer = require("multer");
// create post
// update post
// delete post
// getAll post
// getUser By id
exports.upload = multer({ dest: "uploads/post/" });

//middleware get post by document id
exports.getById = (req, res, next, id) => {
  Post.findById(id)
    .populate("author")
    .exec((err, post) => {
      if (err || !post) {
        console.log(err);
        return res.status(209).json({
          message: "No post was found in DB ",
          data: [],
          error: err,
        });
      }
      // console.log("user by id", user);
      // make undefined varibales that no needed
      post.author.role = undefined;
      post.author.salt = undefined;
      post.author.passwordHash = undefined;
      post.author.__v = undefined;
	  post.__v = undefined;
      req.post = post;
      next();
    });
};
exports.create = async (req, res) => {
  console.log("req body", req.body);
  console.log("req files", req.file);
  const errors = validationResult(req);
  // check errors
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "validation error",
      error: errors.array(),
    });
  }
  let fileObj = null;
  // create new user
  if (req.file && req.file.path) {
    const { path, filename, mimetype } = req.file;
    // save file details to DB;
    fileObj = await File.create({
      name: filename,
      filePath: path,
      type: mimetype,
    });
    console.log("file saved ", fileObj);
  }
  if (req.file && fileObj._id) {
    req.body.fileId = fileObj._id;
  }
  req.body.author = req.user._id;
  Post.create(req.body, (err, data) => {
    if (err) {
      return res.status(400).json({
        message: "getting error",
        error: err,
      });
    }
    console.log("post created ", data);
    // return response
    return res.status(200).json({
      message: "post created!!",
      User: data,
    });
  });
};
// // update user by id
// exports.updateUser = (req, res) => {
// 	// console.log("req user", req.user);
// 	console.log("req body", req.body);
// 	const errors = validationResult(req);
// 	// check errors
// 	if (!errors.isEmpty()) {
// 		return res.status(400).json({ error: errors.array() });
// 	}
// 	const userId = req.body.id;
// 	req.body.id = undefined;
// 	console.log("user idz", { userId });

// 	User.findByIdAndUpdate(
// 		userId,
// 		{ $set: req.body },
// 		{ new: true },
// 		(err, user) => {
// 			if (err) {
// 				return res.status(400).json({
// 					error: "Getting  error to update this user :" + err,
// 				});
// 			}
// 			user.salt = undefined;
// 			user.passwordHash = undefined;
// 			res.json({ result: user });
// 		}
// 	);
// };

// exports.deleteUser = (req, res) => {
// 	User.deleteOne({ _id: req.body.userId }, function (err) {
// 		if (err)
// 			return res
// 				.status(400)
// 				.json({ error: "failed to delete user error:" + err });
// 		res.status(200).json("user deleted successfully");
// 	});
// };
// // get user by email
// exports.getUser = (req, res, next) => {
// 	User.findOne({ email: req.body.email }, (err, user) => {
// 		if (err || !user) {
// 			return res.status(400).json({
// 				error: "No user was found in DB",
// 			});
// 		}
// 		req.user = user;
// 		next();
// 	});
// };
// get all users
exports.getAllByUser = (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      return res.json({
        msg: "error in get all posts",
        error: err,
      });
    }
    return res.json({ msg: "All posts", posts });
  });
};
// get all posts
exports.getAll = (req, res) => {
	Post.find({}, (err, posts) => {
	  if (err) {
		return res.json({
		  message: "error to get all posts",
		  error: err,
		});
	  }
	  return res.json({ 
		  	message: "All posts",
			data: posts
		 });
	});
  };
