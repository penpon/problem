let timerId = null;
let seconds = 0;

const $start = document.getElementById('startBtn');
const $stop = document.getElementById('stopBtn');
const $counter = document.getElementById('counter');
const $status = document.getElementById('statusText');

function updateCounter() {
  seconds += 1;
  $counter.textContent = String(seconds);
}

function startTimer() {
  if (timerId !== null) return; // 重複開始防止
  $status.textContent = '計測中';
  timerId = setInterval(updateCounter, 1000);
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
  $status.textContent = '停止中';
}

$start.addEventListener('click', startTimer);
$stop.addEventListener('click', stopTimer);
