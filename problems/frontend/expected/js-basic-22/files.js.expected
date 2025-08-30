const unit = Number(document.getElementById('unit-price').textContent) || 0;
const qty = document.getElementById('qty-input');
const subEl = document.getElementById('subtotal');
const feeEl = document.getElementById('shipping-fee');
const totalEl = document.getElementById('total');
const std = document.getElementById('ship-standard');
const exp = document.getElementById('ship-express');
function sub(){ return (Number(qty.value)||0) * unit; }
function fee(){ return exp.checked ? 800 : 300; }
function update(){
  subEl.textContent = String(sub());
  feeEl.textContent = String(fee());
  totalEl.textContent = String(sub() + fee());
}
qty.addEventListener('input', update);
std.addEventListener('change', update);
exp.addEventListener('change', update);
update();
