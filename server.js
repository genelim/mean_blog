var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mean_blog');

var post = mongoose.Schema({
	title: String,
	date: Date,
	border_color: String
});

var Post = mongoose.model('Post', post);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/blog',function(request, response){
	Post.find(function(err, post){
		console.log(post);
		response.json(post);
	});
});

app.listen('3000');