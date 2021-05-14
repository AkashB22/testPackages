const loadFile = (name) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            return resolve(`this is contents in ${name}`);
        }, 500);
    })
}

const files = [
    "1.txt",
    "2.txt",
    "3.txt",
    "4.txt",
    "5.txt",
];

loadFile(files[0])  
.then(data=>{
    console.log('single ', data);
});

//sequential execution with async/await and forof
let startTimer = Date.now();
(async ()=>{
    let contents = [];
    for(let file of files){
        contents.push(await loadFile(file));
    }
    console.log('forOf ', contents);
    let endTimer = Date.now();
    console.log(`async ${(endTimer-startTimer)/1000} secs`);
})();

//parallel execution with map and promise.all
const allContents = files.map(file=>{
    return loadFile(file);
})
Promise.all(allContents).then(result=>{
    console.log("map and promise all ", result);
    let endTimer = Date.now();
    console.log(`map ${(endTimer-startTimer)/1000} secs`);
})

//sequential execution with forEach;
let currentPromise = Promise.resolve([]);
files.forEach(file=>{
    currentPromise = currentPromise.then(allContents=>{
        return loadFile(file).then(content=>{
            allContents.push(content);
            return allContents;
        })
    })
});
currentPromise.then(result=>{
    console.log('forEach ', result);
    let endTimer = Date.now();
    console.log(`forEach ${(endTimer-startTimer)/1000} secs`);
})


//sequential execution with reduce