const fs = require('fs');

fs.readFile(__dirname + '/missing.txt', 'utf-8', (err, data)=>{
    if(err) throw err;
    data = data.split("Processing File :");
    filePath = [];
    fileFtrPath = [];
    data.forEach(str=>{
        if(str.includes("ERROR: An error occurred (404) when calling the HeadObject operation: Not Found")){
            let tmp = str.split("\n")[0].trim();
            filePath.push("\"" + tmp + "\"");
            if(!tmp.includes("_360p") && !tmp.includes("_480p")){
                fileFtrPath.push("\"" + tmp + "\"");
            } else{
                // console.log(tmp);
            }
        }
    });

    let fileData = "filePath = [" + filePath.join(",") + "];";
    let fileData1 = "fileFtrPath = [" + fileFtrPath.join(",") + "];"
    fs.writeFile(__dirname+ '/filePath.txt', fileData , (err)=>{
        if(err) throw err;
    })
    fs.writeFile(__dirname+ '/fileFtrPath.txt', fileData1 , (err)=>{
        if(err) throw err;
    })
    console.log(filePath.length);
    console.log(fileFtrPath.length);
})