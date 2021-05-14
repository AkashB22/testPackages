// let d = {
//     e : 3
// }
// let obj1 = {
//     a: 1,
//     b:2, 
//     c: d
// }

// let obj2 = {
//     f: 4,
//     g: 5,
//     h: d
// }

// obj2.h.e = 6;

// console.log(obj1);
// console.log(obj2);
// console.log(d);

// let d = {
//     val : 3,
//     next : null
// }

// let obj1 = {
//     head : null,
//     tail : null
// }

// obj1.head = d;
// obj1.tail = obj1.head;

// let e = {
//     val : 4,
//     next : null
// }

// obj1.tail.next= e;
// obj1.tail = e; 

// let f = {
//     val : 4,
//     next : null
// }

// obj1.tail.next= f;
// obj1.tail = f; 


// console.log(JSON.stringify(obj1));


let node = {
    val: 1,
    next: 2,
    prev: 3
}

let head = node;
let newNode = {
    val: 4,
    next: 5,
    prev: 6
}

head.next = newNode;
let check = head.next;
head.prev = null;
head.next = null;
console.log(check);
// console.log(node);