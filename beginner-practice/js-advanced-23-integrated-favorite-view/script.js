const items = [
  { id: 1, title: 'Pro Camera', favorite: false },
  { id: 2, title: 'Mini Tripod', favorite: true },
  { id: 3, title: 'Light Stand', favorite: false },
  { id: 4, title: 'Pro Light', favorite: false }
];

const $onlyFav = document.getElementById('onlyFav');
const $favCount = document.getElementById('favCount');
const $list = document.getElementById('itemList');

function getView() {
  const only = $onlyFav.checked;
  return only ? items.filter(i => i.favorite) : items.slice();
}

function updateFavCount() {
  const count = items.filter(i => i.favorite).length;
  $favCount.textContent = String(count);
}

function render() {
  $list.innerHTML = '';
  updateFavCount();
  for (const it of getView()) {
    const card = document.createElement('div');
    card.className = 'item';

    const title = document.createElement('div');
    title.className = 'item-title';
    title.textContent = it.title;

    const btn = document.createElement('button');
    btn.className = 'fav-btn';
    btn.textContent = it.favorite ? '★ お気に入り' : '☆ お気に入り';
    if (it.favorite) btn.classList.add('fav-active');

    btn.addEventListener('click', () => {
      it.favorite = !it.favorite;
      render();
    });

    card.appendChild(title);
    card.appendChild(btn);
    $list.appendChild(card);
  }
}

$onlyFav.addEventListener('change', render);

render();
