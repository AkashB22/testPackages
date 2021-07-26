class Amplifier{
    volume: number;
    public on(){
        console.log("Amplifier turned on");
    }

    public setVolume(volume){
        this.volume = volume;
        console.log(`volume set to ${this.volume}`);
    }

    public off(){   
        console.log("Amplifier turned off");
    }
}

class Bluray{
    channel: number;
    public on(){
        console.log("Bluray turned on");
    }

    public setChannel(channel){
        this.channel = channel;
        console.log(`channel set to ${this.channel}`);
    }

    public off(){   
        console.log("Bluray turned off");
    }
}

class Lights{
    public on(){
        console.log("Lights turned on");
    }

    public off(){   
        console.log("Lights turned off");
    }
}

class TV{
    public on(){
        console.log("TV turned on");
    }

    public off(){   
        console.log("TV turned off");
    }
}

class HomeTheater{
    private amplifier: Amplifier;
    private bluray: Bluray;
    private lights: Lights;
    private tv: TV;
    constructor(amplifier: Amplifier, bluray: Bluray, lights: Lights, tv: TV){
        this.amplifier = amplifier;
        this.bluray = bluray;
        this.lights = lights;
        this.tv = tv;
    }

    watchMovie(){
        this.amplifier.on();
        this.amplifier.setVolume(10);
        this.bluray.on();
        this.bluray.setChannel(1);
        this.lights.off();
        this.tv.on();
        console.log("Started Movie");
    }

    off(){
        this.amplifier.off();
        this.bluray.off();
        this.lights.on();
        this.tv.off();
        console.log("Home Theater turned off");
    }
}

const amplifier = new Amplifier();
const bluray = new Bluray();
const lights = new Lights();
const tv = new TV();
const homeTheater = new HomeTheater(amplifier, bluray, lights, tv);

homeTheater.watchMovie();
homeTheater.off();