// 商品データ（最小サンプル）
const products = [
  { id: 1, name: 'Pro Camera', price: 49800 },
  { id: 2, name: 'Light Stand', price: 3200 },
  { id: 3, name: 'Mini Tripod', price: 1800 },
  { id: 4, name: 'Pro Light', price: 9800 },
  { id: 5, name: 'Simple Bag', price: 2500 }
];

const $select = document.getElementById('sortSelect');
const $list = document.getElementById('productList');

function render(list) {
  $list.innerHTML = '';
  list.forEach(p => {
    const li = document.createElement('li');
    li.className = 'product-card';

    const name = document.createElement('div');
    name.className = 'product-name';
    name.textContent = p.name;

    const price = document.createElement('div');
    price.className = 'product-price';
    price.textContent = `¥${p.price.toLocaleString()}`;

    li.appendChild(name);
    li.appendChild(price);
    $list.appendChild(li);
  });
}

function sortProducts(order) {
  const arr = products.slice();
  arr.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
  return arr;
}

$select.addEventListener('change', () => {
  render(sortProducts($select.value));
});

// 初期表示
render(sortProducts($select.value || 'asc'));
