let timerId = null;
let x = 0;

const $start = document.getElementById('startBtn');
const $stop = document.getElementById('stopBtn');
const $status = document.getElementById('statusText');
const $box = document.getElementById('box');
const $stage = document.getElementById('stage');

function step() {
  const stageWidth = $stage.clientWidth;
  const boxWidth = $box.clientWidth;
  x += 4; // 1 ステップの移動量
  if (x > stageWidth - boxWidth) {
    x = 0; // 端まで行ったらリセット
  }
  $box.style.transform = `translateX(${x}px)`;
}

function startAnim() {
  if (timerId !== null) return; // 多重開始防止
  $status.textContent = '再生中';
  timerId = setInterval(step, 16); // 約60fps
}

function stopAnim() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
  $status.textContent = '停止中';
}

$start.addEventListener('click', startAnim);
$stop.addEventListener('click', stopAnim);
