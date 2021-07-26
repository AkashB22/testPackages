interface Subject{
    addObserver(o: Observer): void;
    removeObserver(o: Observer);
    notifyObsevers(value: any);
}

interface Observer{
    update(value: any);
}

class WeatherStation implements Subject{
    observers: Observer[] = [];

    addObserver(o: Observer): void {
        this.observers.push(o);
    }
    removeObserver(o: Observer) {
        this.observers.splice(this.observers.indexOf(o), 1);
    }
    notifyObsevers(value: any) {
        for (const observer of this.observers) {
            observer.update(value);
        }
    }
    public temperature : number;
    public setTemperature(temp){
        this.temperature = temp;
        console.log("New Temperature is set from Weather Station");
        this.notifyObsevers(temp);
    }
}

class TemperatureDisplay implements Observer{
    public subject: Subject;

    constructor(weatherStation: Subject){
        this.subject = weatherStation;
        weatherStation.addObserver(this);
    }
    update(value: any) {
        this.display(value);
    }
    display(temperature){
        console.log(`The new Temperature displayed is ${temperature}`)
    }
}

class Fan implements Observer{
    public subject: Subject;

    constructor(weatherStation: Subject){
        this.subject = weatherStation;
        weatherStation.addObserver(this);
    }
    update(value: any) {
        this.mode(value);
    }
    mode(temperature){
        if(temperature > 25){
            console.log(`The Temperature(${temperature}) is above 25, hence turning on the fan`);
        } else{
            console.log(`The Temperature(${temperature}) is below 25, hence turning off the fan`);
        }
    }
}

const weatherStation = new WeatherStation();
const temperatureDisplay = new TemperatureDisplay(weatherStation);
const fan = new Fan(weatherStation);
weatherStation.setTemperature(30);
weatherStation.setTemperature(20);