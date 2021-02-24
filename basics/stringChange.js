function stringChange(string){
    const strArr = string.split(" ");

    const newStrArr = strArr.map(str=>{
        if(str.length < 3) return str;
        str = str.charAt(str.length - 2) + str.slice(1);
        return str;
    })

    return newStrArr.join(" ");
}

const str = "my name is ram";
console.log(stringChange(str));