var mongoose = require("mongoose");
//var passportLocalMongoose = require("passport-local-mongoose");

var ApartmentSchema = new mongoose.Schema({
	user: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
	ApartmentName: {type: String, required: true},
});

//UserSchema.plugin(passportLocalMongoose, {usernameField : "email"});

module.exports = mongoose.model("Apartment", ApartmentSchema);