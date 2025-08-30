// 商品データ（最小サンプル）
const products = [
  { id: 1, name: 'Pro Camera', price: 49800 },
  { id: 2, name: 'Light Stand', price: 3200 },
  { id: 3, name: 'Mini Tripod', price: 1800 },
  { id: 4, name: 'Pro Light', price: 9800 },
  { id: 5, name: 'Simple Bag', price: 2500 }
];

const $input = document.getElementById('productIdInput');
const $btn = document.getElementById('showBtn');
const $detail = document.getElementById('productDetail');
const $status = document.getElementById('statusText');

function renderDetail(product) {
  $detail.innerHTML = '';
  if (!product) {
    $status.textContent = '見つかりません';
    return;
  }

  const name = document.createElement('div');
  name.className = 'product-name';
  name.textContent = product.name;

  const price = document.createElement('div');
  price.className = 'product-price';
  price.textContent = `¥${product.price.toLocaleString()}`;

  $detail.appendChild(name);
  $detail.appendChild(price);
  $status.textContent = '見つかりました';
}

function findProductById(id) {
  return products.find(p => p.id === id) || null;
}

$btn.addEventListener('click', () => {
  const id = Number($input.value);
  if (!Number.isInteger(id) || id <= 0) {
    renderDetail(null);
    return;
  }
  const product = findProductById(id);
  renderDetail(product);
});
