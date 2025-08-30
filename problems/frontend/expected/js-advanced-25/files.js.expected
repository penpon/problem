const $name = document.getElementById('nameInput');
const $email = document.getElementById('emailInput');
const $msg = document.getElementById('msgInput');
const $pvName = document.getElementById('pvName');
const $pvEmail = document.getElementById('pvEmail');
const $pvMsg = document.getElementById('pvMsg');
const $errors = document.getElementById('errorList');
const $status = document.getElementById('statusText');
const $form = document.getElementById('contactForm');
const $submit = document.getElementById('submitBtn');

function renderPreview(){
  $pvName.textContent = ($name.value || '').trim() || '-';
  $pvEmail.textContent = ($email.value || '').trim() || '-';
  $pvMsg.textContent = ($msg.value || '').trim() || '-';
}

function validate(){
  const errs = [];
  const name = ($name.value || '').trim();
  const email = ($email.value || '').trim();

  if (!name) errs.push('お名前は必須です');
  if (!email) {
    errs.push('メールは必須です');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errs.push('メールの形式が正しくありません');
  }

  $errors.innerHTML = '';
  for (const e of errs) {
    const li = document.createElement('li');
    li.textContent = e;
    $errors.appendChild(li);
  }

  $submit.disabled = errs.length > 0;
  return errs.length === 0;
}

function onInput(){
  renderPreview();
  validate();
}

$name.addEventListener('input', onInput);
$email.addEventListener('input', onInput);
$msg.addEventListener('input', onInput);

$form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  if (!validate()) return;
  $status.textContent = '送信完了';
});

renderPreview();
validate();
