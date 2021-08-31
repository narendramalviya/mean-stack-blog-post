const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const fileController = require("../controllers/file");
const {rootPath} = require('../helpers')

// router.param("userid", getUserById);
router.param("fileid", fileController.getById);
// get file
router.get("/file/:fileid",(req,res)=>{

    console.log('file data',req.fileData);
    console.log('root path',rootPath);
    res.setHeader('Content-Type',req.fileData.type);
    res.sendFile(rootPath +'/'+ req.fileData.filePath );
});

module.exports = router;
