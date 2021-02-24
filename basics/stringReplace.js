/**
 * "groupedSuppliers": "joi.string().regex(/^[0-9]*(\,[0-9]+)*$/).error(() => {return {message:'oneview-lable-43__'}})"
"groupedSuppliers": "joi.string().regex(/^[0-9]*(\,[0-9]+)*$/).error((errors) => { errors.forEach(err => {err.message = 'oneview-lable-43__'});return errors})"
{
    a: "testing the str ((my file) (is) changed)"
}
 */

//  function replacer(str){
//     const index = str.indexOf('error(() => {return');
//     if(index > -1){
//         const label = getLabel(str, index);

//         let endBracketIndex = 0;
//         let trackingCloseBracket = 0;
//         for(let i=index+6; i<str.length;i++ ){
//             if(str[i] === '('){
//                 trackingCloseBracket++;
//             }
//             if(str[i] === ')'){
//                 if(trackingCloseBracket > 0) trackingCloseBracket--;
//                 else{
//                     endBracketIndex = i;
//                     break;
//                 }
//             }
//         }

//         let newStr = str.slice(0, index + 6) + `(errors) => { errors.forEach(err => {err.message = '${label}__'});return errors}` + str.slice(endBracketIndex);
//         return newStr;
//     } else{
//         return str;
//     }
//  }

//  function getLabel(str, index){
//      let temp = str.slice(index + 6).split('__')[0];
//      let label = temp.split('\'').pop();
//      return label;
//  }

//  console.log(replacer(`"groupedSuppliers": "joi.string().regex(/^[0-9]*(\,[0-9]+)*$/).error(() => {return {message:'oneview-lable-43__'}})"`));

 let str="joi.string().regex(/^[0-9]*(\,[0-9]+)*$/).error(() => {return {message:'oneview-lable-43__'}})"
 let searchstring=".error(() => {return"
 recursive(str);
function recursive(innerData)
{
    let n=innerData.indexOf(searchstring)
    let endindex=innerData.indexOf( ")",n+searchstring.length)
    let letIndexOfundescore=innerData.indexOf("__",n)
    let number=innerData.slice(innerData.lastIndexOf("-",87)+1,letIndexOfundescore)
    const str=innerData.slice(0, n)+".error(() =>new Error('oneview-lable-"+number+"__')"+innerData.slice(endindex,innerData.length);
    console.log(str);
    return str;
}

