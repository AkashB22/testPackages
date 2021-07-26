abstract class Car {
    public abstract cost(): number;
    public description: string;

    public getDescription(): string {
        return this.description;
    }
}

abstract class CarOptions extends Car {
    decoratedCar: Car;
    constructor(car){
        super();
        this.decoratedCar = car;
    }
    public abstract cost(): number;
    public abstract getDescription(): string;
}

class ModelS extends Car {
    public cost() {
        return 73000;
    }

    public description = "Model S";
}

class ModelX extends Car {
    public cost() {
        return 77000;
    }

    public description = "Model X";
}

class RearSeated extends CarOptions {

    constructor(car: Car) {
        super(car);
        this.description = car.description + ", Rear Seated";
    }

    cost(): number {
        return this.decoratedCar.cost() + 5000;
    }
    getDescription(): string {
        return this.description;
    }
}

class GpsEnabled extends CarOptions {

    constructor(car: Car) {
        super(car);
        this.description = car.description + ", GPS Enabled";
    }

    public cost(): number {
        return this.decoratedCar.cost() + 10000;
    }
    public getDescription(): string {
        return this.description;
    }
}

const tesla = new RearSeated(new GpsEnabled(new ModelX()));

console.log(tesla.cost());
console.log(tesla.getDescription());
console.log(tesla.description);
