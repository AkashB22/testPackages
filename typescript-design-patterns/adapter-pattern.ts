interface Iphone{
    useMicroUsb();
}

interface Android{
    useThunderBolt();
}

class Iphone7 implements Iphone {
    useMicroUsb(){
        console.log("using microUSB");
    }
}

class Pixel implements Android{
    useThunderBolt(){
        console.log("using thunderbolt");
    }
}

class IphoneAdapter implements Android{
    iphoneDevice: Iphone;

    constructor(iphone:Iphone){
        this.iphoneDevice = iphone;
    }

    useThunderBolt() {
        console.log("Adding adapter from thunderbolt to microUsb");
        this.iphoneDevice.useMicroUsb()    
    }
}

const iphone7 = new Iphone7();
iphone7.useMicroUsb();
const iphoneAdapter = new IphoneAdapter(iphone7);
iphoneAdapter.useThunderBolt();
iphoneAdapter.iphoneDevice.useMicroUsb();
