var fs = require('fs'),
	formidable = require('formidable'),
	mv = require('mv'),
	urlFile;

exports.upload = function(request, response) {
	console.log("Rozpoczynam obsługę żądania upload.");
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
		mv(files.upload.path, 'obrazek.jpg', function (err) {
			if(err) throw error;
		});
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}

exports.welcome = function(request, response) {
	process.stdout.write('Rozpoczynam obsługę żądania welcome.');
	fs.readFile('templates/start.html', function(err, html) {
		response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		response.write(html);
		response.end();
	});
};

exports.error = function(request, response) {
	process.stdout.write('Nie wiem, co robić');
	response.write('404: Nie bangla' ); 
	response.end();
};

exports.show = function(request, response) {
	fs.readFile('obrazek.jpg', 'binary', function(error, file) {
		response.writeHead(200, {'Content-Type': 'image/jpg'});
		response.write(file, 'binary');
		response.end();
	});
};
