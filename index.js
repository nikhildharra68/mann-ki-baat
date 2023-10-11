const express = require('express')
const app = express()
const port = 3000
const http=require('http')
const server= http.createServer(app)//request listener
const path=require('path');
const socketio=require("socket.io");
const io=socketio(server);//object

const users={}

app.use(express.json())
// for static files
app.use("/",express.static(path.join(__dirname,"public")))

io.on('connection' ,(socket)=>{
    console.log(`connection established at ${socket.id}`);

    socket.on('send-msg',(data)=>{
        // console.log(data.msg);
        // socket.emit('recieved-msg',{
            // io will give 1 platform to two users
        io.emit('recieved-msg',{
           msg:data.msg,
           id:socket.id,
           username:users[socket.id]  
        })
    });//listen to some event

    socket.on('login',(data)=>{
        // console.log(data);
        users[socket.id]=data.username;//mapping the socketid with username
           
    });
})


server.listen(port, (req,res) => {
    console.log(`Server listening at http://localhost:${port}`)
})