const mongoose = require("mongoose");
const uuidv1 = require("uuid");
const {Schema} = mongoose;
// Declare the Schema of the Mongo model
var fileSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		filePath: {
			type: String,
			required: true,
		},
	    type:{
			type: String
		}
	},
	{ timestamps: true }
);
//Export the model
module.exports = mongoose.model("Files", fileSchema);