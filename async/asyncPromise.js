function delayFunction(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
           return resolve(100);
        }, 5000);
    })
}

function promiseCall(){
    delayFunction()
        .then(value=>{
            console.log(value);
            return value;
        })
}

function normalfunction(){
    delayFunction()
        .then(data=>(data))
        .then((data)=>{
            console.log("hello", data)
        })
}

normalfunction();