// Header scroll effect
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 20px rgba(8,40,95,.1)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
});

// Form Submission to Google Sheets
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxWZzGJWv7mQLI6g6u9T4LcineKJszZOL0nQK0HneDBwvROYThoSmhiaPeXhemQPG5HHQ/exec';

function submitForm(e) {
  e.preventDefault();

  const form = document.getElementById('fixoraForm');
  const btn = document.getElementById('submitBtn');
  const successMsg = document.getElementById('successMsg');

  const originalText = btn.innerHTML;
  btn.innerHTML = 'Enviando...';
  btn.disabled = true;

  const formData = new FormData(form);

  fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    body: formData
  })
    .then(() => showSuccess())
    .catch(() => {
      alert('Hubo un problema. Intenta de nuevo.');
      btn.innerHTML = originalText;
      btn.disabled = false;
    });

  function showSuccess() {
    form.reset();
    successMsg.style.display = 'block';
    btn.innerHTML = originalText;
    btn.disabled = false;

    setTimeout(() => {
      successMsg.style.display = 'none';
    }, 5000);
  }
}
