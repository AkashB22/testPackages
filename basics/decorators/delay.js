function f(x, y) {
    console.log(`${x} ${y}`);
}

function delay(f, ms){
    return function(...args){
        setTimeout(()=>{
            f.apply(this, args)
        }, ms)    
    }
}

// create wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 5000);

f1000("test","test1"); // shows "test" after 1000ms
f1500("test2"); // shows "test" after 1500ms