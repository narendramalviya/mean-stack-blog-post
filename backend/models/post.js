const mongoose = require("mongoose");
const uuidv1 = require("uuid");
const {Schema} = mongoose;
// Declare the Schema of the Mongo model
var postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: false,
			minLength: 3,
			maxLength:30,
		},
		content: {
			type: String,
			required: true,
			unique: false,
			minLength: 5,
			maxLength: 10000,
		},
		author: { type: Schema.Types.ObjectId, ref: 'users' }
	},
	{ timestamps: true }
);
//Export the model
module.exports = mongoose.model("Posts", postSchema);