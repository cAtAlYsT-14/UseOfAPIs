var express = require("express");
var app = express();

var request = require("request");
var bodyParser = require("body-parser");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
	res.render("home");
});

app.get("/search",function(req,res){
	var name = req.query.MovieSearch;
	var url = "http://www.omdbapi.com/?s=" + name +"&apikey=e2396633";
	request(url,function(error,response,body){
		if(!error && response.statusCode == 200){
			var results = JSON.parse(body);
			if(results["Search"] === undefined)
				res.send("No result found !!");
			else
			res.render("result",{results:results});
		}
	})
});

app.listen(3000,function(req,res){
	console.log("Your App has Started");
});