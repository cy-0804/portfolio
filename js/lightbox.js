document.addEventListener("DOMContentLoaded", () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentIndex = 0;
    let visibleItems = [];

    function updateVisibleItems() {
        visibleItems = Array.from(galleryItems).filter(item => {
            return item.style.display !== 'none' && item.style.opacity !== '0';
        });
    }

    function openLightbox(index) {
        updateVisibleItems();
        currentIndex = index;
        const imgSrc = visibleItems[currentIndex].querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }


    function prevImage() {
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        lightboxImg.src = visibleItems[currentIndex].querySelector('img').src;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % visibleItems.length;
        lightboxImg.src = visibleItems[currentIndex].querySelector('img').src;
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateVisibleItems();
            const visibleIndex = visibleItems.indexOf(item);
            if (visibleIndex !== -1) {
                openLightbox(visibleIndex);
            }
        });
    });

    closeBtn.addEventListener('click', closeLightbox);

    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });
});
