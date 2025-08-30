const subEl = document.getElementById('subtotal');
const feeEl = document.getElementById('shipping-fee');
const totalEl = document.getElementById('total');
const form = document.getElementById('coupon-form');
const input = document.getElementById('coupon');
const statusEl = document.getElementById('status');
let discount = 0; // 0..1
function baseTotal(){ return (Number(subEl.textContent)||0) + (Number(feeEl.textContent)||0); }
function apply(){ totalEl.textContent = String(Math.floor(baseTotal() * (1 - discount))); }
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const code = input.value.trim();
  if (code === 'EC2025') { discount = 0.1; statusEl.textContent = '10%OFFを適用しました'; }
  else if (code === 'FREESHIP') { discount = 0; feeEl.textContent = '0'; statusEl.textContent = '送料を無料にしました'; }
  else if (code.length === 0) { discount = 0; statusEl.textContent = 'コードを入力してください'; }
  else { discount = 0; statusEl.textContent = '無効なクーポンです'; }
  apply();
});
apply();
