console.log("start");

setTimeout(() => {
    console.log("this is timer function");
    Promise.resolve().then(()=>{console.log("PROMISE - timer")})
    console.log("TMR- ins")
});

Promise.resolve().then(() => {
    console.log("THIS PROMISE");
    setTimeout(()=>{
        console.log("TIMER - PROMISE")
    },0)
    Promise.resolve().then(()=>console.log("testing"))
});

console.log("end");

process.nextTick(()=>{
    console.log("this is the next tick queue.")
})