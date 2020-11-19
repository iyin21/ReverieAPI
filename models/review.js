var mongoose = require("mongoose");

var ReviewSchema = new mongoose.Schema({
	apartment: [{type: mongoose.Schema.Types.ObjectId, ref: "Apartment"}],
	landlordReview: String,
	environmentReview: String,
	amenitiesQuality: String,
	image: String,
	video: String,
	rating: {type:Number, default: 0}

});

module.exports = mongoose.model("Review", ReviewSchema);
