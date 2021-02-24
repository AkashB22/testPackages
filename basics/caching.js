async function main(){
    async function caching(){
    let result = await fetch('https://local.dewdropsbff.zycus.net/api/a/dd/users/getTokenId');
    if(result.status === 200){
        let data = await result.json();
        return data;
    } else {
        let keyList = await caches.keys();
        let data = null;
       
        for(let i=0; i<keyList.length; i++){
            if(keyList[i] === 'local'){
                let tokenData = await caches.match('/api/a/dd/users/getTokenId');
                //console.log(tokenData);
                data = await tokenData.json();
                //console.log(data);
            }     
        }
        return data;
    }
}

let result = await caching();
console.log(result);
}

main();