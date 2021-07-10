var name = decodeURIComponent(location.search).split('=')[1];
window.onload = function() {
    socket = io({
        query:{
            name: name,
            verify: true
        },
        reconnection:false
    })
    socket.on('connect',()=>{
    console.log('链接成功啦！');
    document.getElementById('my-profile').innerHTML = name;
    })
    socket.on('receiveMessage',(message)=>{
        console.log('123321');
        textSection = document.getElementById('allMessages');
        textSection.innerHTML += 
        `<li class="media">
        <div class="media__object">
            <img src="./images/avata-2.jpg" alt="${value.render}">
        </div>
        <div class="media__body">
            <p>${message.content}</p>
        </div>
        </li>`
        });
    socket.on('online',(onlines) => {
        console.log('onlines',onlines);
        var friendSection = document.getElementById('onlineFriends');
        friendSection.innerHTML = onlines.map(name => {
            return `<li>
            <p class="friend-profile">${name}</p>
        </li>`;
        }).join('');
    });
    socket.emit('historyMessage',(data) => {
        console.log('111');
        var friendSection = document.getElementById('allMessages');
        friendSection.innerHTML = data.map((value) => {
        if (value.sender == name) {
            return (                `<li class="media myMedia">
            <div class="media__object">
                <img src="./images/avata-2.jpg" alt="${value.render}">
            </div>
            <div class="media__body">
                <p>${value.content}</p>
            </div>
            </li>`)
        }else{
            return (                `<li class="media">
            <div class="media__object">
                <img src="./images/avata-2.jpg" alt="${value.render}">
            </div>
            <div class="media__body">
                <p>${value.content}</p>
            </div>
            </li>`
            );
        }
        }).join('');
    });
}
function setMessage(event) {
    event.preventDefault();
    var message = document.getElementById('message').value;  
    socket.emit('sendMessage',message);
    document.getElementById('allMessages').innerHTML +=
    `<li class="media myMedia">
        <div class="media__object">
            <img src="./images/avata-2.jpg" alt="${value.render}">
        </div>
        <div class="media__body">
            <p>${message}</p>
        </div>
    </li>`
    document.getElementById('message').value = '';
}

