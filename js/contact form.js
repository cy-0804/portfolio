const form = document.querySelector('.contact-form');
const inputs = form.querySelectorAll('input, textarea');

inputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.querySelector('label').style.color = '#c084fc';
  });

  input.addEventListener('blur', () => {
    if (!input.value) {
      input.parentElement.querySelector('label').style.color = '#e0b3ff';
    }
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('.submit-btn');
  const originalText = btn.textContent;

  btn.textContent = 'Sending...';
  btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

  setTimeout(() => {
    btn.textContent = 'Message Sent!';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = 'linear-gradient(135deg, #8b5cf6, #6d28d9, #9333ea)';
      form.reset();
    }, 2000);
  }, 1500);
});