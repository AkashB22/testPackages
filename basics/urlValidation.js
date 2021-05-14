function validateSignedUrl(url){
    const parseUrl = new URL(url),
        createdDate = parseUrl.searchParams.get('X-Amz-Date'),
        expires = parseUrl.searchParams.get('X-Amz-Expires') * 1000;

    let isoDate = "";
    let count = 0

    // console.log(createdDate);

    for(let i=0; i<createdDate.length; i++){
        if(i===4 || i===6){
            isoDate += createdDate.slice(count,i) + "-";
            count = i;
        }
        
        if(i===11 || i===13){
            isoDate += createdDate.slice(count,i) + ":";
            count = i;
        }

        if(i===createdDate.length-1){
            isoDate += createdDate.slice(count,createdDate.length);
        }
        // switch(i){
        //     case 4:
        //     case 6: {
        //         isoDate += createdDate.slice(count,i) + "-";
        //         count = i;
        //         break;
        //     }
        //     case 11:
        //     case 13: {
        //         isoDate += createdDate.slice(count,i) + ":";
        //         count = i;
        //         break;   
        //     }
        //     case createdDate.length - 1: {
        //         isoDate += createdDate.slice(count,createdDate.length);
        //         break;
        //     }
        //     default: break;
        // }
    }

    console.log(isoDate);

    const millisec = Date.parse(isoDate),

    // console.log(millisec);
        validMilliSec = parseInt(millisec) + parseInt(expires);
        isValid = (validMilliSec - Date.now()) > 0;

    return isValid;
}

console.log(validateSignedUrl("https://zycus-sht-qc.s3.ap-south-1.amazonaws.com/SHT/054508f8-2757-4e33-8df6-ac2f4e1fbc09/sht/1588054669571_858309.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAY5ENDKJ556SNIIPQ%2F20200428%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20200428T061753Z&X-Amz-Expires=60&X-Amz-Security-Token=FwoGZXIvYXdzELf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDDKg9bbLwTSHlYRK3CK5AWHC9TeppwZvxTxqNUavE7SVTaAl%2BOgmnto95Dl1WgaHYDgMf9e8ARii7wsEjEby3CZt3tu9KAcBK9NqtzBZ%2Fk2vlcANi5L7y1cMBKQcG3ikqoEbUmg2fWNuRr8%2BUY2VdfU4KeNRqg9k7nWFx9I4d9LtjI%2FfkuAto%2Bh%2Flu5jWQrxnOnf7wlT%2FlAaFe%2FEVtNlyPNSgkVSHfjX1bxLAJcm2gCSh%2BsVwh2eQnmd%2BOr2%2BabHz8RY0kSwm1n8KLuHn%2FUFMi2AXRdlLkqfjYmzBy535ZKbgEmpBypCbpp2MNKhysa2rvlT%2FgZPnzDWXBD3s6w%3D&X-Amz-Signature=9c36ab43fada6181d969ad5953b01c5d928f2292335704c2ec78064a6f0a381e&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20charset%3Dutf-8%3B%20filename%3D858309.jpg"));