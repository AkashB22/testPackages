var Iphone7 = /** @class */ (function () {
    function Iphone7() {
    }
    Iphone7.prototype.useMicroUsb = function () {
        console.log("using microUSB");
    };
    return Iphone7;
}());
var Pixel = /** @class */ (function () {
    function Pixel() {
    }
    Pixel.prototype.useThunderBolt = function () {
        console.log("using thunderbolt");
    };
    return Pixel;
}());
var IphoneAdapter = /** @class */ (function () {
    function IphoneAdapter(iphone) {
        this.iphoneDevice = iphone;
    }
    IphoneAdapter.prototype.useThunderBolt = function () {
        console.log("Adding adapter from thunderbolt to microUsb");
        this.iphoneDevice.useMicroUsb();
    };
    return IphoneAdapter;
}());
var iphone7 = new Iphone7();
iphone7.useMicroUsb();
var iphoneAdapter = new IphoneAdapter(iphone7);
iphoneAdapter.useThunderBolt();
iphoneAdapter.iphoneDevice.useMicroUsb();
