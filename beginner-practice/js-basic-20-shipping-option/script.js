const base = Number(document.getElementById('base').textContent);
const feeEl = document.getElementById('shipping-fee');
const totalEl = document.getElementById('total');
const std = document.getElementById('ship-standard');
const exp = document.getElementById('ship-express');
function update(){
  const fee = exp.checked ? 800 : 300;
  feeEl.textContent = String(fee);
  totalEl.textContent = String(base + fee);
}
std.addEventListener('change', update);
exp.addEventListener('change', update);
update();
