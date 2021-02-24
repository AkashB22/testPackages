function add(a, b){
    return a+b;
}

function calculate(callback){
    return callback
}

console.log(calculate(add(10, 20)));
console.log(calculate(add(100, 500)));