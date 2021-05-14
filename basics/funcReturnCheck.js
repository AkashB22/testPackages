function sendNothing(){
    setTimeout(()=>{
        console.log("done")
        return "document";
    }, 1000);
}
const arr = [];
arr.push(sendNothing());
console.log(arr);