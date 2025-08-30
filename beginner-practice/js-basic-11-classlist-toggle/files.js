document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('toggleBtn');
  const box = document.getElementById('box');

  btn.addEventListener('click', () => {
    box.classList.toggle('d-none');
  });
});
