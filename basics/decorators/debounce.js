// let _ = require('lodash');
let f = function(item){
    console.log(item)
};
function debounce(func, ms){
    let timeout;
    return function (...args){
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            func.apply(this, args);
        }, ms)
    }
}
f = debounce(f, 1000);
f("a");
setTimeout( () => f("d"), 100);
setTimeout( () => f("b"), 1500);
setTimeout( () => f("c"), 3500);
// debounced function waits 1000ms after the last call and then runs: alert("c")