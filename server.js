const express= require('express');
const app= express();
const server= require('http').Server(app);
const io = require('socket.io')(server)//allows for two persons on video at once
const { v4:uuidv4 }=require ('uuid');//v4 is a special version of uuid



app.set ('view engine',  'ejs');
app.use(express.static('public'));

app.get('/', (req,res) => {
res.redirect(`/${uuidv4()}`); //creates unique id for different rooms
})

app.get('/:room', (req,res) =>{
res.render('room', {roomId: req.params.room })

})

io.on('connection', socket => {
socket.on(`join-room`, (roomId)=>{
socket.join(roomId)
socket.to(roomId).broadcast.emit(`user-connected`); //somebody joined room, user connected

})


}) 


server.listen(3030);