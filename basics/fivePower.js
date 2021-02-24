// let input = [31, 26, 130, 128, 35];
let input = [394376, 421875, 390625, 781250, 484377];
console.log(`Test Number ------------------ Output`)
input.forEach(val=>{
    console.log(`${val} ---------------------------- ${checkIfCoefficientOfFive(val)}`)
})

function checkIfCoefficientOfFive(val){
    const maxPower = getMaxFivePower(val);
    const remainder = val - Math.pow(5, maxPower);
    if(remainder > 4){
        return checkIfCoefficientOfFive(remainder);
    } else{
        return (remainder === 1) || (remainder === 0);
    }
}

function getMaxFivePower(val){
    let maxPow = 0,
    temp = val;
    while(temp > 1){
        temp = temp - Math.pow(5, maxPow);
        maxPow++;
    }
    maxPow = maxPow - 1;
    return maxPow;
}