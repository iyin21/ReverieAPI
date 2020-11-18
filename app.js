var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var mongoose = require("mongoose");


var indexRoutes = require("./routes/index");
var usersRoutes = require("./routes/users");
var postRoutes = require("./routes/posts");

mongoose.connect("mongodb://localhost/blogapp",{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

app.use(bodyParser.urlencoded({extended : true}));

app.set('view engine', 'ejs');



app.use(indexRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postRoutes);

app.listen(2000, function(){
	console.log("Blogapp has started");
});


