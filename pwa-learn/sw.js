self.addEventListener('install',event=>{    //安装事件
    console.log('install:',event)
    // event.waitUntil(new Promise(resolve=>{
    //     setTimeout(resolve, 5000);
    // }))
    event.waitUntil(self.skipWaiting());
})
self.addEventListener('activate',event=>{   //激活事件
    console.log('activate:',event)
})
self.addEventListener('fetch',event=>{
    console.log('fetch:',event)
})