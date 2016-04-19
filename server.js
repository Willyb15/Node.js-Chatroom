var http = require('http');
var fs = require('fs');
var port = process.env.PORT || '8500';
var server = http.createServer(function(req, res) {
    fs.readFile('index.html', 'utf-8', function(error, data) {
        res.writeHead(200, {
            'content-type': "text/html"
        });
        res.write(data);
        res.end();
    });
});

// $('#chat-window').on('click', function(){
// 	console.log('someone clicked');
// });

var io = require('socket.io').listen(server);
var messageArray = [];
// numUsers = 0;

io.sockets.on('connect', function(socket){
	// numUsers++;
	// io.sockets.emit('message_to_client',{
	// 	numUsers: numUsers
	// });

	console.log("Someone connected to the server!!!");
	// console.log(socket);
	socket.on('message_to_server', function(data){
		console.log(data);
		var date = new Date();
		io.sockets.emit('message_to_client',{
			message: data.message,
			date: date
		});
		messageArray.push(data.message);
	});
});
server.listen(port);
// server.listen(2100);
console.log("William commands to listen Port 8500. I obey. Listening on Port 8500...");