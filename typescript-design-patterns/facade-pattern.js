var Amplifier = /** @class */ (function () {
    function Amplifier() {
    }
    Amplifier.prototype.on = function () {
        console.log("Amplifier turned on");
    };
    Amplifier.prototype.setVolume = function (volume) {
        this.volume = volume;
        console.log("volume set to " + this.volume);
    };
    Amplifier.prototype.off = function () {
        console.log("Amplifier turned off");
    };
    return Amplifier;
}());
var Bluray = /** @class */ (function () {
    function Bluray() {
    }
    Bluray.prototype.on = function () {
        console.log("Bluray turned on");
    };
    Bluray.prototype.setChannel = function (channel) {
        this.channel = channel;
        console.log("channel set to " + this.channel);
    };
    Bluray.prototype.off = function () {
        console.log("Bluray turned off");
    };
    return Bluray;
}());
var Lights = /** @class */ (function () {
    function Lights() {
    }
    Lights.prototype.on = function () {
        console.log("Lights turned on");
    };
    Lights.prototype.off = function () {
        console.log("Lights turned off");
    };
    return Lights;
}());
var TV = /** @class */ (function () {
    function TV() {
    }
    TV.prototype.on = function () {
        console.log("TV turned on");
    };
    TV.prototype.off = function () {
        console.log("TV turned off");
    };
    return TV;
}());
var HomeTheater = /** @class */ (function () {
    function HomeTheater(amplifier, bluray, lights, tv) {
        this.amplifier = amplifier;
        this.bluray = bluray;
        this.lights = lights;
        this.tv = tv;
    }
    HomeTheater.prototype.watchMovie = function () {
        this.amplifier.on();
        this.amplifier.setVolume(10);
        this.bluray.on();
        this.bluray.setChannel(1);
        this.lights.off();
        this.tv.on();
        console.log("Started Movie");
    };
    HomeTheater.prototype.off = function () {
        this.amplifier.off();
        this.bluray.off();
        this.lights.on();
        this.tv.off();
        console.log("Home Theater turned off");
    };
    return HomeTheater;
}());
var amplifier = new Amplifier();
var bluray = new Bluray();
var lights = new Lights();
var tv = new TV();
var homeTheater = new HomeTheater(amplifier, bluray, lights, tv);
homeTheater.watchMovie();
homeTheater.off();
