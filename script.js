const display = document.getElementById("display");

let ms = 0;
let sec = 0;
let minute = 0;
let hour = 0;

let interval = null;
let running = false;

const startBtn = document.getElementById("StartBtn");
const stopBtn = document.getElementById("StopBtn");
const resetBtn = document.getElementById("ResetBtn");
const lapBtn = document.getElementById("LapBtn");
const lapsContainer = document.getElementById("laps");

let laps = [];

function startTimer() {
    ms += 10;
    if (ms >= 1000) {
        ms = 0;
        sec++;
    }
    if (sec >= 60) {
        sec = 0;
        minute++;
    }
    if (minute >= 60) {
        minute = 0;
        hour++;
    }
    updateDisplay();
}

function formatTime() {
    return `${pad(hour)}:${pad(minute)}:${pad(sec)}.${String(ms).padStart(3, "0")}`;
}

function updateDisplay() {
    display.textContent = formatTime();
}

function pad(value) {
    return String(value).padStart(2, "0");
}

function displayLaps() {
    lapsContainer.innerHTML = "";
    laps.forEach((lap, index) => {
        const li = document.createElement("li");
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsContainer.appendChild(li);
    });
}

startBtn.addEventListener("click", () => {
    if (!running) {
        interval = setInterval(startTimer, 10);
        running = true;
    }
});

stopBtn.addEventListener("click", () => {
    clearInterval(interval);
    running = false;
});

resetBtn.addEventListener("click", () => {
    clearInterval(interval);
    running = false;
    ms = 0;
    sec = 0;
    minute = 0;
    hour = 0;
    laps = [];

    lapsContainer.innerHTML = "";
    updateDisplay();
});

lapBtn.addEventListener("click", () => {
    if (!running) return;
    const lapTime = formatTime();
    laps.push(lapTime);
    displayLaps();
})