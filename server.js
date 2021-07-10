const http = require('http');
const express = require('express');
const socketIO = require('socket.io').Server;

const app = new express();
const server = http.createServer(app);
const io = new socketIO(server);
const historys = [];
const sockets = {};
app.use(express.static('./web'));
server.listen(3000);

io.use((socket,next) => {
    console.log('a client incoming');
    const name = socket.handshake.query.name;
    const password = socket.handshake.query.password;
    const verify = socket.handshake.query.verify;
    if (verify){ //已认证
        next();
        return;
    }
    if(!name) {
        console.log('拒绝连接，没有账户名');
        next(new Error('empty'));
        return;
    }
    if(password !=='111') {
        console.log('拒绝连接，密码错误');
        next(new Error('error'));
        return;
    }
    next();
});
io.on('connection',(socket) => {
    console.log('a user connected');
    const name = socket.handshake.query.name;
    const password = socket.handshake.query.password;
    sockets[name] = socket;
    socket.on('sendMessage',(content) => {
        console.log('receive a message',name,content);
        const message = {
          time:Date.now(),
            sender:name,
            content
        };
        historys.push(message);
        socket.broadcast.emit('receiveMessage',message);
    });
    socket.on('historyMessage',(fn)=>{
        fn(historys);
    });
    socket.on('disconnect',(reason) => {
        delete sockets[name];
        console.log('a user disconnected:',name,reason);
        io.sockets.emit('online',Object.keys(sockets));
    });
    io.sockets.emit('online',Object.keys(sockets));
    });


