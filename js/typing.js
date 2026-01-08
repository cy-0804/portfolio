// Typing animation for the main title

document.addEventListener('DOMContentLoaded', () => {
    const titleElement = document.querySelector('.home-content h1');
    const textSpan = titleElement.querySelector('.text');

    const textToType = "I am ANG CHA YAN";

    textSpan.textContent = "";
    textSpan.setAttribute('data-text', "");

    titleElement.classList.add('typing-cursor');

    let charIndex = 0;
    const typingSpeed = 100;
    const startDelay = 500;

    function type() {
        if (charIndex < textToType.length) {
            const currentText = textToType.substring(0, charIndex + 1);
            textSpan.textContent = currentText;
            textSpan.setAttribute('data-text', currentText);
            charIndex++;
            setTimeout(type, typingSpeed);
        }
    }


    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(type, startDelay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(titleElement);
});
