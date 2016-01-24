var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
app.get('/', function(req, res){
  console.log('sending presentation');
  res.sendfile('presentation.html');
});
app.get('/landing', function(req, res){
  console.log('sending landing');
  res.sendfile('landing.html');
});
io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('next slide', function(data) {
    console.log('next slide fam');
    socket.broadcast.emit('next slide');
    socket.emit('next slide');
  });

  socket.on('prev slide', function(data) {
    console.log('prev slide fam');
    socket.broadcast.emit('prev slide');
    socket.emit('prev slide');
  });
  socket.on('close link', function(data) {
    console.log('close link fam');
    socket.broadcast.emit('close link');
    socket.emit('close link');
  });
  socket.on('link open', function(data) {
    console.log('open link fam');
    console.log(data);
    socket.broadcast.emit('link show', data);
    socket.emit('link show', data);
  });
});



http.listen(3000, "100.64.233.23", function(){
  console.log('listening on *:3000');
});
