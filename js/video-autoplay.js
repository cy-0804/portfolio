document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('video');

    const lazyVideoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                if (video.getAttribute('preload') === 'none') {
                    video.preload = 'metadata';
                }
                observer.unobserve(video);
            }
        });
    }, { rootMargin: '200px' });

    videos.forEach(video => {
        video.muted = true;
        video.loop = true;

        lazyVideoObserver.observe(video);

        video.addEventListener('mouseenter', () => {
            if (video.readyState < 2) {
                video.load();
            }
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => { });
            }
        });

        video.addEventListener('mouseleave', () => {
            video.pause();
        });
    });
});
