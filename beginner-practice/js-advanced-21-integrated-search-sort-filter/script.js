// 商品データ（カテゴリ付与）
const products = [
  { id: 1, title: 'Pro Camera', price: 49800, category: 'camera' },
  { id: 2, title: 'Light Stand', price: 3200, category: 'accessory' },
  { id: 3, title: 'Mini Tripod', price: 1800, category: 'accessory' },
  { id: 4, title: 'Pro Light', price: 9800, category: 'accessory' },
  { id: 5, title: 'Compact Camera', price: 29800, category: 'camera' }
];

const $search = document.getElementById('searchInput');
const $category = document.getElementById('categorySelect');
const $sort = document.getElementById('sortSelect');
const $apply = document.getElementById('applyBtn');
const $count = document.getElementById('countText');
const $list = document.getElementById('productList');

function filterAndSort(items) {
  const keyword = ($search.value || '').trim().toLowerCase();
  const cat = $category.value;
  const sort = $sort.value;

  let arr = items.filter(p => {
    const okKeyword = keyword.length === 0 || p.title.toLowerCase().includes(keyword);
    const okCat = cat === 'all' || p.category === cat;
    return okKeyword && okCat;
  });

  arr = arr.slice().sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    return 0;
  });
  return arr;
}

function render(items) {
  $list.innerHTML = '';
  $count.textContent = String(items.length);
  for (const p of items) {
    const el = document.createElement('div');
    el.className = 'product';

    const t = document.createElement('div');
    t.className = 'product-title';
    t.textContent = p.title;

    const price = document.createElement('div');
    price.className = 'product-price';
    price.textContent = `¥${p.price.toLocaleString()}`;

    const cat = document.createElement('div');
    cat.className = 'product-category';
    cat.textContent = `カテゴリ: ${p.category}`;

    el.appendChild(t);
    el.appendChild(price);
    el.appendChild(cat);
    $list.appendChild(el);
  }
}

$apply.addEventListener('click', () => {
  render(filterAndSort(products));
});

// 初期表示
render(filterAndSort(products));
