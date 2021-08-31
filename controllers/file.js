const File = require("../models/file");
const { check, validationResult } = require("express-validator");

//middleware get post by document id
exports.getById = (req, res, next, id) => {
        File.findById(id).exec((err, file) => {
            if (err || !file) {
              console.log(err);
              return res.status(400).json({
                message: "file not found",
                error: err,
              });
            }
            // console.log("user by id", user);
            // make undefined varibales that no needed
            
            req.fileData = file;
            next();
          });
}

	