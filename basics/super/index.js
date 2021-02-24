"use strict";
class Ext {
    constructor() { }
    Ext_m1() {
        console.log("Ext_m1");
    }

}

class A {
    constructor() { }

    A_m1() {
        console.log("A_m1");
    }

    get Ext() {
        return Ext;
    }
}

class B extends A {
    constructor() {
        super();
    }

    B_m1() {
        console.log("B_m1");
    }

    test() {
        const data = new (super.Ext)();
        data.Ext_m1();
    }
}

const output = new B();
output.test();
output.B_m1();
output.A_m1();