let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapCount = 0;

const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');

const startPauseBtn = document.getElementById('startPauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapList = document.getElementById('lapList');

// Format numerical intervals into dual digit string fields
function formatTimeUnit(unit) {
    return unit.toString().padStart(2, '0');
}

function updateDisplay() {
    let tempTime = elapsedTime;

    const ms = Math.floor((tempTime % 1000) / 10);
    tempTime = Math.floor(tempTime / 1000);

    const secs = tempTime % 60;
    tempTime = Math.floor(tempTime / 60);

    const mins = tempTime % 60;
    const hrs = Math.floor(tempTime / 60);

    hoursDisplay.textContent = formatTimeUnit(hrs);
    minutesDisplay.textContent = formatTimeUnit(mins);
    secondsDisplay.textContent = formatTimeUnit(secs);
    millisecondsDisplay.textContent = formatTimeUnit(ms);
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10); // Precise execution interval mapping updates every 10ms

    startPauseBtn.textContent = 'Pause';
    startPauseBtn.className = 'btn btn-primary-pause';
    lapBtn.disabled = false;
    resetBtn.disabled = true;
    isRunning = true;
}

function pauseTimer() {
    clearInterval(timerInterval);
    startPauseBtn.textContent = 'Start';
    startPauseBtn.className = 'btn btn-primary-start';
    lapBtn.disabled = true;
    resetBtn.disabled = false;
    isRunning = false;
}

startPauseBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTimer();
    } else {
        pauseTimer();
    }
});

lapBtn.addEventListener('click', () => {
    // Evacuate the default empty layout text node cleanly on first lap
    if (lapCount === 0) {
        lapList.innerHTML = '';
    }

    lapCount++;
    
    const formattedLapTime = `${hoursDisplay.textContent}:${minutesDisplay.textContent}:${secondsDisplay.textContent}.${millisecondsDisplay.textContent}`;
    
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="lap-index">LAP ${formatTimeUnit(lapCount)}</span>
        <span class="lap-time">${formattedLapTime}</span>
    `;
    
    // Inject newest lap timestamps flawlessly to the top tier entry position
    lapList.insertBefore(li, lapList.firstChild);
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    lapCount = 0;
    isRunning = false;
    
    updateDisplay();
    
    startPauseBtn.textContent = 'Start';
    startPauseBtn.className = 'btn btn-primary-start';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    
    lapList.innerHTML = '<li class="empty-state">No intervals recorded yet.</li>';
});