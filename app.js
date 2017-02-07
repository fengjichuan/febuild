var express = require('express');
var app = express();

// app.set("views", __dirname + "/html");
// app.engine('html', require('ejs').renderFile);
// app.set("view engine", "*");

/*
app.all(/^[^.]+\.(jsp|html|css)$/, function(req, res, next) {
	console.log(req.path);
	var actionPath = req.path.slice(1, req.path.lastIndexOf('.'));
	var fileType = req.path.slice(req.path.lastIndexOf('.'));
	var viewPath = actionPath + fileType;

	console.log(viewPath);

	res.sendFile(__dirname + '/' + viewPath);
	
	// res.render(actionPath, {
	// 	request: req,
	// 	response: res
	// });

});
*/

app.use(express.static('E:/www/febuild'));


app.listen(8899);

