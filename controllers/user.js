const User = require("../models/user");
const { check, validationResult } = require("express-validator");
// create user
// update user
// delete user
// getAll users
// getUser By id

//middleware get user by document id
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    // console.log("user by id", user);
    // make undefined varibales that no needed
    user.passwordHash = undefined;
    user.salt = undefined;
    req.user = user;
    next();
  });
};
exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  // check errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  try{
	let result = await User.findOne({ email: req.body.email }).exec();
	console.log('result ',result);
    if(result) {
		return res.status(400).json({
			status: 400,
			message: "email already exist's, use another",
			error: "",
		  });
	}

	result = await User.findOne({ phone: req.body.phone }).exec();
    if(result) {
		return res.status(400).json({
			status: 400,
			message: "phone number already exist's, use another",
			error: "",
		  });
	}

	result = await User.create(req.body);
	console.log('user created',result);
	if(result) {
		result.role = undefined;
		result.salt = undefined;
		result.passwordHash = undefined;

		return res.status(200).json({
			status: 200,
			message: "signup success",
			error: "",
			data:result
		  });
	}
  }catch(error){
	console.log('error',error);
	return res.status(400).json({
		status: 400,
		message: "getting error",
		error
	  });
  }



 

  // create new user
  User.create(req.body, (err, data) => {
    if (err) {
      console.log("error ", err);
      return res.status(200).json({
        status: 200,
        message: "getting error",
        error: err,
      });
    }
    // return response
    return res.json({
      status: 200,
      message: "User created!!",
      data,
    });
  });
};
// update user by id
exports.updateUser = (req, res) => {
  // console.log("req user", req.user);
  console.log("req body", req.body);
  const errors = validationResult(req);
  // check errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const userId = req.body.id;
  req.body.id = undefined;
  console.log("user idz", { userId });

  User.findByIdAndUpdate(
    userId,
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Getting  error to update this user :" + err,
        });
      }
      user.salt = undefined;
      user.passwordHash = undefined;
      res.json({ result: user });
    }
  );
};

exports.deleteUser = (req, res) => {
  User.deleteOne({ _id: req.body.userId }, function (err) {
    if (err)
      return res
        .status(400)
        .json({ error: "failed to delete user error:" + err });
    res.status(200).json("user deleted successfully");
  });
};
// get user by email
exports.getUser = (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.user = user;
    next();
  });
};
// get all users
exports.getAllUsers = (req, res) => {
  // console.log("process.env.SECRET ",process.env.SECRET);
  User.find({}, (err, users) => {
    if (err) {
      return res.json({
        message: "error in get all users",
        error: err,
      });
    }

    return res.json({ message: "All users", users });
  });
};
