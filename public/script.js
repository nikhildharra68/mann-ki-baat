

const socket= io();

const send=document.getElementById('send-btn')//button id
const input=document.getElementById('inp')//textarea id
const chat=document.getElementById('chat')


$('#chat-box').hide();
$(send).on('click',()=>{
    const msgText= $(input).val();
    // console.log(msgText);

    if(!msgText){
        return
    }else{
        socket.emit('send-msg',{
            msg:msgText
        })//emit msg to index.js

    }

    $(input).val("");
})

socket.on('recieved-msg',(data)=>{
    console.log(data);
    $(chat).append(`<li class="border mb-2 p-2 rounded-pill "><span class="fw-bold">${data.username} : </span>-> ${data.msg}  </li>
    `)
})
$('#login-btn').on('click',()=>{
    // console.log("click");
   const username= $('#username').val();
   socket.emit('login',{
    username:username
   })

   $('#chat-box').show();
   $('#login').hide();

   $('#username').val("")
})