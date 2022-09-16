const startBtn = document.getElementById("startBtn");
const speedBtn = document.getElementById("speedBtn");
const pauseBtn = document.getElementById("pauseBtn");

var decompte;

let speedChrono = 1

speedBtn.textContent = "x"+speedChrono

function createChrono() {
    this.paused = false;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.getSeconds = function(){
        return this.seconds
    }
    this.getMinutes = function(){
        return this.minutes
    }
    this.getHours = function(){
        return this.hours
    }
    this.reset = function(){
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
    }
    this.getChrono = function(){
        return ajouteUnZero(this.hours)+":"+ajouteUnZero(this.minutes)+":"+ajouteUnZero(this.seconds);
    }
}

function ajouteUnZero(tps) {
    if (tps < 10) {
        return "0"+tps
    }
    return tps
}

function updateDecompte() {
    clearInterval(decompte)
    decompte = setInterval(() => {
        if  (typeof startTime != "undefined") {
            if (!startTime.paused) {
                if (startTime.seconds >= 60) {
                    startTime.seconds = 0;
                    startTime.minutes += 1;
                }
                if (startTime.minutes >= 60) {
                    startTime.minutes = 0;
                    startTime.hours += 1;
                }
                startTime.seconds += 1;
                startBtn.textContent = startTime.getChrono();
            };
        }
    }, (1 / speedChrono) * 1000);
}

updateDecompte();


function startChrono(){
    startTime = new createChrono();
}

function stopChrono() {
    startBtn.textContent = "Start";
    startTime = undefined;
}

function pauseChrono() {
    if (typeof startTime != "undefined") {
        startTime.paused = !startTime.paused
    }

    if (startTime.paused) {
        pauseBtn.textContent = "Reprendre"
    } else {
        pauseBtn.textContent = "Pause"
    }
}

function changeSpeed(action) {
    if (action == "plus"){
        if (speedChrono != 8192) {
            speedChrono *= 2
        }
    } else if (action == "moins"){
        if (speedChrono != 0.25) {
            speedChrono /= 2
        }
    }
    updateDecompte();
    speedBtn.textContent = "x"+speedChrono
}