// Tab Navigation Logic
function setTab(tipo) {
  // Update hidden field
  document.getElementById('tipo_usuario').value = tipo;

  // Update tab UI
  document.getElementById('tab-usuario').classList.remove('active');
  document.getElementById('tab-tecnico').classList.remove('active');
  document.getElementById('tab-' + tipo).classList.add('active');

  // Show/Hide sections
  const fieldsUsuario = document.getElementById('fields-usuario');
  const fieldsTecnico = document.getElementById('fields-tecnico');

  if (tipo === 'usuario') {
    fieldsUsuario.classList.add('active');
    fieldsTecnico.classList.remove('active');
    
    // Manage required attributes based on visible fields
    setRequired(fieldsUsuario, true);
    setRequired(fieldsTecnico, false);
  } else {
    fieldsTecnico.classList.add('active');
    fieldsUsuario.classList.remove('active');
    
    // Manage required attributes based on visible fields
    setRequired(fieldsTecnico, true);
    setRequired(fieldsUsuario, false);
  }
}

function setRequired(container, isRequired) {
  const inputs = container.querySelectorAll('input, select');
  inputs.forEach(input => {
    if (isRequired) {
      input.setAttribute('required', 'required');
    } else {
      input.removeAttribute('required');
      // Reset values when hidden
      if (input.tagName === 'SELECT') {
        input.selectedIndex = 0;
      } else {
        input.value = '';
      }
    }
  });
}

// Initial setup to ensure required fields are correct
document.addEventListener('DOMContentLoaded', () => {
  setTab('usuario'); // Default to usuario
  
  // Header scroll effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 50) {
      header.style.boxShadow = 'var(--shadow-sm)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
});

// Form Submission to Google Sheets
// Reemplaza esta URL con la que te genere Google Apps Script
const GOOGLE_SCRIPT_URL = 'URL_DE_TU_GOOGLE_APPS_SCRIPT_AQUI';

function submitForm(e) {
  e.preventDefault();
  
  const form = document.getElementById('fixoraForm');
  const btn = document.getElementById('submitBtn');
  const successMsg = document.getElementById('successMsg');
  
  // Change button state
  const originalText = btn.innerHTML;
  btn.innerHTML = 'Enviando...';
  btn.disabled = true;

  // Create form data object
  const formData = new FormData(form);
  
  // En caso de que aún no tengas el script de Google configurado, simulamos el éxito.
  // Cuando tengas la URL, descomenta la parte de fetch y elimina el setTimeout.
  
  /*
  fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if(response.ok) {
      showSuccess();
    } else {
      throw new Error('Network response was not ok.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Hubo un problema al enviar los datos. Intenta nuevamente.');
    btn.innerHTML = originalText;
    btn.disabled = false;
  });
  */

  // --- MOCK SUBMIT (Eliminar cuando actives fetch) ---
  setTimeout(() => {
    showSuccess();
  }, 1500);
  // --------------------------------------------------
  
  function showSuccess() {
    form.reset();
    successMsg.style.display = 'block';
    btn.innerHTML = originalText;
    btn.disabled = false;
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      successMsg.style.display = 'none';
    }, 5000);
  }
}
