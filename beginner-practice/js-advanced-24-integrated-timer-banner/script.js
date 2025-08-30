let timerId = null;
let remaining = 0;

const $start = document.getElementById('startBtn');
const $stop = document.getElementById('stopBtn');
const $sec = document.getElementById('secText');
const $status = document.getElementById('statusText');
const $banner = document.getElementById('banner');

function updateView(){
  $sec.textContent = String(remaining);
  if (remaining > 0) {
    $banner.classList.add('show');
    $status.textContent = '表示中';
  } else {
    $banner.classList.remove('show');
    $status.textContent = '停止中';
  }
}

function start(sec = 5){
  clearInterval(timerId);
  remaining = Math.max(0, sec);
  updateView();
  if (remaining === 0) return;
  timerId = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0){
      remaining = 0;
      clearInterval(timerId);
    }
    updateView();
  }, 1000);
}

function stop(){
  clearInterval(timerId);
  remaining = 0;
  updateView();
}

$start.addEventListener('click', () => start(5));
$stop.addEventListener('click', stop);

updateView();
