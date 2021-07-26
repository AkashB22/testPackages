var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.getDescription = function () {
        return this.description;
    };
    return Car;
}());
var CarOptions = /** @class */ (function (_super) {
    __extends(CarOptions, _super);
    function CarOptions(car) {
        var _this = _super.call(this) || this;
        _this.decoratedCar = car;
        return _this;
    }
    return CarOptions;
}(Car));
var ModelS = /** @class */ (function (_super) {
    __extends(ModelS, _super);
    function ModelS() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.description = "Model S";
        return _this;
    }
    ModelS.prototype.cost = function () {
        return 73000;
    };
    return ModelS;
}(Car));
var ModelX = /** @class */ (function (_super) {
    __extends(ModelX, _super);
    function ModelX() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.description = "Model X";
        return _this;
    }
    ModelX.prototype.cost = function () {
        return 77000;
    };
    return ModelX;
}(Car));
var RearSeated = /** @class */ (function (_super) {
    __extends(RearSeated, _super);
    function RearSeated(car) {
        var _this = _super.call(this, car) || this;
        _this.description = car.description + ", Rear Seated";
        return _this;
    }
    RearSeated.prototype.cost = function () {
        return this.decoratedCar.cost() + 5000;
    };
    RearSeated.prototype.getDescription = function () {
        return this.description;
    };
    return RearSeated;
}(CarOptions));
var GpsEnabled = /** @class */ (function (_super) {
    __extends(GpsEnabled, _super);
    function GpsEnabled(car) {
        var _this = _super.call(this, car) || this;
        _this.description = car.description + ", GPS Enabled";
        return _this;
    }
    GpsEnabled.prototype.cost = function () {
        return this.decoratedCar.cost() + 10000;
    };
    GpsEnabled.prototype.getDescription = function () {
        return this.description;
    };
    return GpsEnabled;
}(CarOptions));
var tesla = new RearSeated(new GpsEnabled(new ModelX()));
console.log(tesla.cost());
console.log(tesla.getDescription());
console.log(tesla.description);
