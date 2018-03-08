var http = require('http'),
	colors = require('colors'),
	handlers = require('./handlers')

function start() {
	function onRequest(request, response) {
		process.stdout.write('Odebrano zapytanie'.blue);
		console.log('Zapytanie ' + request.url + ' odebrane.');

		response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
		
		switch (request.url) {
			case '/':
			case '/start':
				handlers.welcome(request, response);
				break;
			case '/upload':
				handlers.upload(request, response);
				break;
			case '/show':
				handlers.show(request, response);
				console.log('show');
				break;
			default:
				handlers.error(request, response);
		}
	}

	http.createServer(onRequest).listen(9000);

	process.stdout.write('Uruchomiono serwer!'.blue);
}

exports.start = start;