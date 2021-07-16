const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
var multer = require("multer");
const dotenv = require("dotenv");
var moment = require('moment'); // require
moment().format();
dotenv.config();
const app = express();
// db connection
mongoose.connect("mongodb://localhost:27017/Blog", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	// we're connected!
	console.log("db connected");
});

// configuration for multer ,file handling middleware
var upload = multer({ dest: "uploads" });

// app middleware
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());

// routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
app.get("/home", (req, res) => {
	res.send("home");
});

// use routes
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", postRoutes);

const port = 7000;
app.listen(port, () => {
	console.log(`server running at port ${port}`);

// install momentjs package
// npm install moment
// import package in script file
// var moment = require('moment'); // require
// d = date string
// let d = Date.now();
// 	2021-07-20
// 20-07-2021
// 2021-20-07
// let d = '05-23-2021';
// let formattedDate = moment(d).format('DD-MM-yyyy');
// console.log('formattedDate',formattedDate);
//output 15-07-2021

});

process.on("uncaughtException", (err) => {
	console.log("uncaught exception", err);
});
