// enterPress = document.getElementById("controls");
// enterPress.addEventListener("keyup", function(e) {
//     var event = e || window.event;
//     var key = event.which || event.keyCode || event.charCode;
//     if(key == 13) {
//     var name = "Hdu-Zhangyi";
//     var password = "password";
//     if (name == document.getElementById('name').value){
//         if(password == document.getElementById('password').value){
//             window.location.href = "./chat.html";
//         }else{
//             alert('用户名或密码错误');
//         }
//     }else{
//         alert('用户名或密码错误');
//     }
//     }
// })
function loginVerifiction(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    window.socket = io({
        query:{
            name: name,
            password: password
        },
        reconnection:false,
    });
    
    // socket.on('connect',()=>{
    //     login.setAttribute("class","login disappear");
    //     setTimeout(()=>{
    //     })
    // })
    
    socket.on('connect_error',(e)=>{
        console.log('connect_error',e);
        if(e&&e.message=='error'){
            alert('密码错误，请检查');
            return;
        }
        alert('链接失败，请检查服务器地址');
    });

    socket.on('connect',()=>{
        window.location.href = "chat.html?name=" + encodeURIComponent(name);
    });
}