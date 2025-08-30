const $name = document.getElementById('nameInput');
const $email = document.getElementById('emailInput');
const $submit = document.getElementById('submitBtn');
const $status = document.getElementById('statusText');
const $errors = document.getElementById('errorList');

function validate() {
  const errs = [];
  const name = ($name.value || '').trim();
  const email = ($email.value || '').trim();

  if (name.length === 0) {
    errs.push('名前を入力してください');
  }
  // 簡易メール判定（@ と . を含む程度の最小チェック）
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errs.push('メールアドレスの形式が正しくありません');
  }
  return errs;
}

function renderErrors(errs) {
  $errors.innerHTML = '';
  for (const msg of errs) {
    const li = document.createElement('li');
    li.textContent = msg;
    $errors.appendChild(li);
  }
}

$submit.addEventListener('click', () => {
  const errs = validate();
  renderErrors(errs);
  if (errs.length === 0) {
    $status.textContent = '送信成功';
    $status.classList.add('success');
  } else {
    $status.textContent = 'エラーあり';
    $status.classList.remove('success');
  }
});
