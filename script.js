/**
 * Ping Coming Soon Page - Form Validation & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('subscribe-form');
  const emailInput = document.getElementById('email-input');
  const inputGroup = emailInput.closest('.input-group');
  const errorMessage = document.getElementById('email-error');
  const successBanner = document.getElementById('success-banner');
  const submitBtn = document.getElementById('submit-btn');

  // RFC-compliant practical email regex
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  /**
   * Display error message and apply styling
   * @param {string} message
   */
  function showError(message) {
    inputGroup.classList.add('has-error');
    emailInput.setAttribute('aria-invalid', 'true');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    if (successBanner) {
      successBanner.hidden = true;
    }
  }

  /**
   * Clear error state
   */
  function clearError() {
    inputGroup.classList.remove('has-error');
    emailInput.removeAttribute('aria-invalid');
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
  }

  /**
   * Show success feedback
   */
  function showSuccess() {
    clearError();
    if (successBanner) {
      successBanner.hidden = false;
    }
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribed!';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.85';
    emailInput.disabled = true;

    setTimeout(() => {
      emailInput.disabled = false;
      emailInput.value = '';
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    }, 4000);
  }

  /**
   * Validate email input
   * @returns {boolean}
   */
  function validateEmail() {
    const value = emailInput.value.trim();

    if (value === '') {
      showError('Whoops! It looks like you forgot to add your email');
      emailInput.focus();
      return false;
    }

    if (!emailPattern.test(value)) {
      showError('Please provide a valid email address');
      emailInput.focus();
      return false;
    }

    clearError();
    return true;
  }

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateEmail()) {
      showSuccess();
    }
  });

  // Clear or revalidate on input change
  emailInput.addEventListener('input', () => {
    if (inputGroup.classList.contains('has-error')) {
      const value = emailInput.value.trim();
      if (value !== '' && emailPattern.test(value)) {
        clearError();
      }
    }
  });
});
