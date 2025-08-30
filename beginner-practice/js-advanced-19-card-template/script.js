// 商品データ（最小サンプル）
const products = [
  { id: 1, title: 'Pro Camera', price: 49800 },
  { id: 2, title: 'Light Stand', price: 3200 },
  { id: 3, title: 'Mini Tripod', price: 1800 },
  { id: 4, title: 'Pro Light', price: 9800 }
];

const $btn = document.getElementById('generateBtn');
const $list = document.getElementById('cardList');
const $status = document.getElementById('statusText');

function renderCards(items) {
  $list.innerHTML = '';
  for (const item of items) {
    const card = document.createElement('div');
    card.className = 'card';

    const t = document.createElement('div');
    t.className = 'card-title';
    t.textContent = item.title;

    const p = document.createElement('div');
    p.className = 'card-price';
    p.textContent = `¥${item.price.toLocaleString()}`;

    card.appendChild(t);
    card.appendChild(p);
    $list.appendChild(card);
  }
}

$btn.addEventListener('click', () => {
  renderCards(products);
  $status.textContent = '生成済み';
});
