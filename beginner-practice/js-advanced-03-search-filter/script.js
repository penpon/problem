// 商品データ（js-basic を下地にした最小サンプル）
const products = [
  { id: 1, name: 'Pro Camera', price: 49800 },
  { id: 2, name: 'Light Stand', price: 3200 },
  { id: 3, name: 'Mini Tripod', price: 1800 },
  { id: 4, name: 'Pro Light', price: 9800 },
  { id: 5, name: 'Simple Bag', price: 2500 }
];

const $input = document.getElementById('searchInput');
const $list = document.getElementById('productList');
const $count = document.getElementById('resultCount');

function render(list) {
  // 安全のため textContent で反映
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
  $count.textContent = String(list.length);
}

function filterProducts(keyword) {
  const k = keyword.trim().toLowerCase();
  if (!k) return products;
  return products.filter(p => p.name.toLowerCase().includes(k));
}

$input.addEventListener('input', () => {
  const filtered = filterProducts($input.value);
  render(filtered);
});

// 初期表示
render(products);
