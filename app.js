var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var mongoose = require("mongoose");
var User = require("./models/user");
var Apartment = require("./models/apartment");
var Review = require("./models/review");


// mongoose.connect("mongodb://localhost/reverie",{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});
// mongodb+srv://iyinoluwa:<password>@reverie.lwbxy.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://iyinoluwa:esther@reverie.lwbxy.mongodb.net/<dbname>?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}));

app.post("/user", function(req, res){
	var user = new User();
	user.username = req.body.username;
	user.save(function(err, savedUser){
		if(err){
			res.status(500).send({error:"Could not save user"});
		} else{
			res.send(savedUser);
		}
	})
});
app.get("/user", function(req, res){
	User.find({}, function(err, users){
		if(err){
			res.status(500).send({error: "Could not fetch users"});
		}else{
			res.send(users);
		}
	})
});

app.post("/apartment", function(req, res){
	var apartment = new Apartment();
	apartment.apartmentName = req.body.apartmentName;
	apartment.save(function(err, savedApartment){
		if(err){
			res.status(500).send({error:"Could not save apartment"});
		} else{
			res.send(savedApartment);
		}
	});
});
app.get("/apartment", function(req, res){
	Apartment.find({}).populate({path:"user", model: "User"}).exec(function(err, apartments){
		if(err){
			res.status(500).send({error: "Could not fetch apartments"});
		}else{
			res.send(apartments);
		}
	})
});
app.get("/", function(req, res){
	User.find({}).populate({path:"apartment", model: "Apartment"}).populate({path:"review", model: "Review"}).lean().exec(function(err, allUsers){
		if(err){
			res.status(500).send({error: "Could not fetch apartments"});
		}else{
			res.send(allUsers);
		}
	})
});


app.get("/review", function(req, res){
	Review.find({}).populate({path:"user", model: "User"}).populate({path:"apartment", model: "Apartment"}).exec(function(err, reviews){
		if(err){
			res.status(500).send({error: "Could not fetch reviews"});
		}else{
			res.send(reviews);
		}
	});
});

app.post("/review", function(req, res){
	var review = new Review();
	review.landlordReview = req.body.landlordReview;
	review.environmentReview = req.body.environmentReview;
	review.amenitiesQuality = req.body.amenitiesQuality;
	review.image = req.body.image;
	review.video = req.body.video;
	review.rating = req.body.rating;

	review.save(function(err, newReview){
		if (err) {
			res.status(500).send({error: "Could not create review"})
		} else {
			res.send(newReview);
		}
	})
})

app.put("/apartment/user/add", function(req, res){
	User.findOne({_id: req.body.userId}, function(err, user){
		if(err){
			res.status(500).send({error: "Could not add apartment name"});
		} else{
			Apartment.update({_id: req.body.apartmentId}, {$addToSet:{user: user._id}}, 
			function(err, apartment){
				if(err){
					res.status(500).send({error: "Could not add apartment name"});
				} else{
					res.send(apartment);
				}
				
			});
		}
	})
});

app.put("/review/apartment/add", function(req, res){
	Apartment.findOne({_id: req.body.apartmentId}, function(err, apartment){
		if(err){
			res.status(500).send({error: "Could not add review"});
		} else{
			Review.update({_id: req.body.reviewId}, {$addToSet:{apartment: apartment._id}}, 
			function(err, review){
				if(err){
					res.status(500).send({error: "Could not add review"});
				} else{
					res.send(review);
				}
				
			});
		}
	})
});
app.listen(process.env.PORT || 5000, function(){
	console.log("Reverie API has started");
});


