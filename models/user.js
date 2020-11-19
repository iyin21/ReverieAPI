var mongoose = require("mongoose");
//var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String}
});

//UserSchema.plugin(passportLocalMongoose, {usernameField : "email"});

module.exports = mongoose.model("User", UserSchema);