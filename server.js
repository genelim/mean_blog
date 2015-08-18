var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	nodemailer = require('nodemailer');

var user = 'username@gmail.com',
	pass = 'password';

//enable - https://www.google.com/settings/security/lesssecureapps , only it will work, IF WITHOUT XOAuth2. 
var smtpTransport = nodemailer.createTransport("SMTP", {
  	service: "Gmail",
  	auth: {
    	XOAuth2: {
      		user: user, 
      		clientId: "583098112938-bkjifegs0jdlbi88vot22alr4ltet235.apps.googleusercontent.com",
      		clientSecret: 'PAX1Nixjbcng6T_Zl0TsR83T',
      		refreshToken: "1/X8vH9lg8RM8aJATRe17EM4N94O0KVCE0nG_AVyijTLM"
    	}
  	}
});

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
		response.json(post);
	});
});
app.get('/article/:id', function(request, response){
	Post.findOne({_id:request.params.id},function(err,post){
		response.json(post);
	});
});

app.post('/contact', function(request,response){
	var mailOptions = {
	    from: request.body.email, 
	    to: user,
	    subject: request.body.names, 
	    generateTextFromHTML: true,
	    html: request.body.message 
	}
	smtpTransport.sendMail(mailOptions, function(error, res){
	    if(error){
	        console.log(error);
	    }else{
	        console.log("Message sent: " + res.message);
			response.json(res.message);
	    }
	    smtpTransport.close();
	});
});

app.listen('3000');