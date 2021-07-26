var WeatherStation = /** @class */ (function () {
    function WeatherStation() {
        this.observers = [];
    }
    WeatherStation.prototype.addObserver = function (o) {
        this.observers.push(o);
    };
    WeatherStation.prototype.removeObserver = function (o) {
        this.observers.splice(this.observers.indexOf(o), 1);
    };
    WeatherStation.prototype.notifyObsevers = function (value) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(value);
        }
    };
    WeatherStation.prototype.setTemperature = function (temp) {
        this.temperature = temp;
        console.log("New Temperature is set from Weather Station");
        this.notifyObsevers(temp);
    };
    return WeatherStation;
}());
var TemperatureDisplay = /** @class */ (function () {
    function TemperatureDisplay(weatherStation) {
        this.subject = weatherStation;
        weatherStation.addObserver(this);
    }
    TemperatureDisplay.prototype.update = function (value) {
        this.display(value);
    };
    TemperatureDisplay.prototype.display = function (temperature) {
        console.log("The new Temperature displayed is " + temperature);
    };
    return TemperatureDisplay;
}());
var Fan = /** @class */ (function () {
    function Fan(weatherStation) {
        this.subject = weatherStation;
        weatherStation.addObserver(this);
    }
    Fan.prototype.update = function (value) {
        this.mode(value);
    };
    Fan.prototype.mode = function (temperature) {
        if (temperature > 25) {
            console.log("The Temperature(" + temperature + ") is above 25, hence turning on the fan");
        }
        else {
            console.log("The Temperature(" + temperature + ") is below 25, hence turning off the fan");
        }
    };
    return Fan;
}());
var weatherStation = new WeatherStation();
var temperatureDisplay = new TemperatureDisplay(weatherStation);
var fan = new Fan(weatherStation);
weatherStation.setTemperature(30);
weatherStation.setTemperature(20);
