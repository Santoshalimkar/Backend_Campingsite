const mongoose = require("mongoose");

const PropertyownerSchema = new mongoose.Schema(
	{
		Name: {
			type: String
		},
		password: {
			type: String
		},
		email: {
			type: String,
			lowercase: true,
			required: true,
			unique: true
		},
	
		contactNumber: {
			type: String,
			trim: true,
			unique: true
		},
        isAdmin: {
			type: Boolean,
			default: false
		},
		isowner: {
			type: Boolean,
			default: true
		},
    })

const propertyowner = mongoose.model("Propertyowner", PropertyownerSchema);
module.exports = propertyowner;
