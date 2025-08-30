const form = document.getElementById('coupon-form');
const input = document.getElementById('coupon');
const statusEl = document.getElementById('status');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const code = input.value.trim();
  if(code === 'SAVE10'){
    statusEl.textContent = '10%割引を適用しました';
  } else {
    statusEl.textContent = '無効なクーポンです';
  }
});
