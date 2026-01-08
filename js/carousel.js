document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.carousel-container');
    if (!container) return;

    const track = container.querySelector('.video-grid');
    const prevBtn = container.querySelector('.carousel-btn.prev');
    const nextBtn = container.querySelector('.carousel-btn.next');

    // Original cards
    const originalCards = Array.from(track.querySelectorAll('.video-card'));
    if (originalCards.length === 0) return;

    // Card width + gap calculation (approximate)
    // We'll calculate strictly on load, but safe info: 350px width + 1.5rem (24px) gap = 374px
    const cardWidth = 350;
    const gap = 24;
    const itemWidth = cardWidth + gap;

    // --- INFINITE LOOP SETUP ---
    // Clone first 2 and last 2 items
    const clonesCount = 2;
    const firstClones = originalCards.slice(0, clonesCount).map(c => {
        const clone = c.cloneNode(true);
        clone.classList.add('clone');
        return clone;
    });
    const lastClones = originalCards.slice(-clonesCount).map(c => {
        const clone = c.cloneNode(true);
        clone.classList.add('clone');
        return clone;
    });

    // Append/Prepend clones and initialize them
    [...firstClones, ...lastClones].forEach(clone => {
        // Ensure clones are ready to play
        clone.querySelector('video').preload = 'metadata';
        clone.querySelector('video').muted = true;
        clone.querySelector('video').loop = true;
    });

    firstClones.forEach(clone => track.appendChild(clone));
    lastClones.reverse().forEach(clone => track.insertBefore(clone, track.firstChild));

    // --- INITIAL POSITION ---
    // Scroll to the first REAL item (after the prepended clones)
    // Center alignment adjustment: The CSS has padding-left: calc(50% - 175px)
    // So scrollLeft = 0 puts the first element (now a clone) in center.
    // We want the first REAL element (index 2) in center.
    // Index 0, 1 are clones. Index 2 is real #1.
    // Position of Index 2 = 2 * itemWidth
    const startScrollPos = clonesCount * itemWidth;
    track.scrollLeft = startScrollPos;


    // --- FOCUS LOGIC ---
    const updateActiveSlide = () => {
        const allCards = track.querySelectorAll('.video-card');
        const center = track.scrollLeft + (track.clientWidth / 2);

        let closestCard = null;
        let minDistance = Infinity;

        allCards.forEach(card => {
            const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
            const distance = Math.abs(center - cardCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestCard = card;
            }
        });

        allCards.forEach(card => {
            if (card === closestCard) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    };

    // --- INFINITE LOOP SCROLL HANDLER ---
    const handleScroll = () => {
        updateActiveSlide();

        const totalRealWidth = originalCards.length * itemWidth;

        // If we scrolled too far left (into left clones)
        // Clones are at index 0, 1. Real start at 2.
        // If scrollLeft < roughly 1 itemWidth (showing first clone in center)
        // Jump forward by totalRealWidth
        // Threshold: close to 0
        if (track.scrollLeft < (itemWidth / 2)) {
            track.scrollLeft += totalRealWidth;
        }

        // If we scrolled too far right (into right clones)
        // Start of right clones is at: clonesCount * itemWidth + realWidth
        // If scrollLeft > that point
        else if (track.scrollLeft > (startScrollPos + totalRealWidth + (itemWidth / 2))) {
            track.scrollLeft -= totalRealWidth;
        }
    };

    track.addEventListener('scroll', handleScroll);

    // Initial Focus
    updateActiveSlide();


    // --- BUTTONS ---
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: itemWidth, behavior: 'smooth' });
        });
    }

    // --- RESIZE HANDLER (Optional fixes) ---
    window.addEventListener('resize', () => {
        // Recalculate if needed, usually css handles it
    });
});
