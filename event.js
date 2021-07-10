const EventEmitter = require('events');
const myEmitter = new EventEmitter();

//1.一次emit多个监听事件都触发
myEmitter.on('event',()=>{
    console.log('触发事件1');
});

myEmitter.on('event',()=>{
    console.log('触发事件2');
});

myEmitter.emit('event');

//2.可以传入参数
myEmitter.on('event2',(a,b)=>{
    console.log(a,b);
});

myEmitter.emit('event2','a','b');

//3.可以传入函数
myEmitter.on('event3',(fn)=>{
    fn('可以传入函数')
});

myEmitter.emit('event3',(a)=>{
    console.log(a);
})