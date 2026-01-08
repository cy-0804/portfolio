function createOverlay() {
    const overlay = document.createElement("div");
    overlay.className = "transition-overlay";

    const colors = [
        "#1a0b2e",
        "#240a35",
        "#2e0b3f",
        "#370c4a",
        "#410d54",
        "#4b0e5f",
        "#320a45",
        "#280838",
        "#1e062b",
        "#14041e"
    ];


    for (let i = 0; i < 10; i++) {
        const bar = document.createElement("div");
        bar.className = "transition-bar";


        bar.style.backgroundColor = colors[i % colors.length];


        bar.style.setProperty('--i', i);

        overlay.appendChild(bar);
    }

    document.body.appendChild(overlay);
    return overlay;
}

document.addEventListener("DOMContentLoaded", () => {

    const overlay = createOverlay();
    overlay.classList.add("is-active");

    void overlay.offsetWidth;

    setTimeout(() => {
        overlay.classList.remove("is-active");
    }, 50);


    const links = document.querySelectorAll("a");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetUrl = link.getAttribute("href");

            if (targetUrl &&
                !targetUrl.startsWith("#") &&
                link.getAttribute("target") !== "_blank" &&
                !targetUrl.startsWith("http") &&
                !targetUrl.startsWith("mailto:") &&
                !link.classList.contains("btn-contact")
            ) {

                e.preventDefault();

                overlay.classList.add("is-active");

                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 750);
            }
        });
    });
});
