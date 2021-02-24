// function asynchronous(){
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             resolve("hello");
//         }, 2000);
//     })
// }

// function first(){
//     console.log("run before");
// }

// asynchronous().then(data=> console.log(data));
// first();
// console.log("world");

function asyncFunction (item, cb) {
    setTimeout(() => {
      console.log('done with', item);
      cb();
    }, 100);
  }
  
  let requests = [1, 2, 3].reduce((promiseChain, item) => {
      return promiseChain.then(() => new Promise((resolve) => {
        asyncFunction(item, resolve);
      }));
  }, Promise.resolve());
  
  requests.then(() => console.log('done'))