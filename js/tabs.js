document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const tabButtons = document.querySelectorAll('.tab-btn');


    function filterGallery(category) {
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'inline-block';

                setTimeout(() => {
                    item.style.opacity = '1';
                }, 10);
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });
    }


    const activeBtn = document.querySelector('.tab-btn.active');
    if (activeBtn) {
        filterGallery(activeBtn.getAttribute('data-tab'));
    } else {
        filterGallery('all');
    }


    tabButtons.forEach(button => {
        button.addEventListener('click', () => {

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');


            const category = button.getAttribute('data-tab');
            filterGallery(category);
        });
    });
});
