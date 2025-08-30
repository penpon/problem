const unitPrice = Number(document.getElementById('unit-price').textContent);
const qtyInput = document.getElementById('qty-input');
const subtotalEl = document.getElementById('subtotal');
function update(){
  const q = Math.max(0, Number(qtyInput.value)||0);
  subtotalEl.textContent = String(unitPrice * q);
}
qtyInput.addEventListener('input', update);
update();
