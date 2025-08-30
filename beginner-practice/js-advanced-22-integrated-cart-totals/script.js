const rows = Array.from(document.querySelectorAll('.cart-row[data-id]'));
const $shipping = document.getElementById('shippingSelect');
const $coupon = document.getElementById('couponInput');
const $apply = document.getElementById('applyBtn');
const $sumSubtotal = document.getElementById('sumSubtotal');
const $sumShipping = document.getElementById('sumShipping');
const $sumTotal = document.getElementById('sumTotal');
const $status = document.getElementById('statusText');

function formatYen(n){ return `¥${n.toLocaleString()}`; }

function recalc() {
  let subtotal = 0;
  for (const row of rows) {
    const price = Number(row.querySelector('.price').dataset.price);
    const qty = Math.max(0, Number(row.querySelector('.qty-input').value || 0));
    const st = price * qty;
    row.querySelector('.subtotal').textContent = formatYen(st);
    subtotal += st;
  }
  // shipping: 0 => 500yen, 1 => 0yen
  const ship = $shipping.value === '0' ? 500 : 0;

  // coupon: SAVE10 => 10% off on subtotal
  let discount = 0;
  const code = ($coupon.value || '').trim().toUpperCase();
  if (code === 'SAVE10') {
    discount = Math.floor(subtotal * 0.1);
  }

  const total = Math.max(0, subtotal - discount + ship);

  $sumSubtotal.textContent = formatYen(subtotal - discount);
  $sumShipping.textContent = formatYen(ship);
  $sumTotal.textContent = formatYen(total);
  $status.textContent = '計算済み';
}

for (const row of rows) {
  const $dec = row.querySelector('.dec');
  const $inc = row.querySelector('.inc');
  const $input = row.querySelector('.qty-input');
  $dec.addEventListener('click', () => { $input.value = Math.max(0, Number($input.value||0) - 1); recalc(); });
  $inc.addEventListener('click', () => { $input.value = Number($input.value||0) + 1; recalc(); });
  $input.addEventListener('input', recalc);
}
$shipping.addEventListener('change', recalc);
$apply.addEventListener('click', recalc);

// 初期計算
recalc();
