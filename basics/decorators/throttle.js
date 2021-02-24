// let _ = require('lodash');
let f = function(item){
    console.log(item)
};
// function throttle(func, ms) {

//     let isThrottled = false,
//       savedArgs,
//       savedThis;
  
//     function wrapper() {
  
//       if (isThrottled) { // (2)
//         savedArgs = arguments;
//         savedThis = this;
//         return;
//       }
  
//       func.apply(this, arguments); // (1)
  
//       isThrottled = true;
  
//       setTimeout(function() {
//         isThrottled = false; // (3)
//         if (savedArgs) {
//           wrapper.apply(savedThis, savedArgs);
//           savedArgs = savedThis = null;
//         }
//       }, ms);
//     }
  
//     return wrapper;
// }

function throttle(func, ms){
  let callFunc = true;
  let savedArgs;
  let savedThis;
  function wrapper(){
      if(!callFunc){
        savedArgs = arguments;
        savedThis = this;
        return;
      }
      func.apply(this, arguments);
      callFunc = false;
      setTimeout(()=>{
        callFunc = true;
        if(savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedThis = savedArgs = null;
        }
      }, ms)
  }
  return wrapper;
}

f = throttle(f, 1000);
f("a");
setTimeout( () => f("d"), 100);
setTimeout( () => f("e"), 200);
setTimeout( () => f("f"), 400);
setTimeout( () => f("b"), 2000);
setTimeout( () => f("c"), 4000);
// throttled function waits 1000ms after the last call and then runs: alert("c")