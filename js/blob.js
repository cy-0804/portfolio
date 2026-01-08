class BlobSystem {
  constructor() {
    this.container = document.querySelector(".blob-container");
    this.blobs = [];
    this.colors = [
      "rgba(227, 163, 255, 0.6)",
      "rgba(109, 40, 217, 0.6)",
      "rgba(147, 51, 234, 0.6)",
      "rgba(85, 101, 247, 0.6)",
      "rgba(144, 205, 244, 0.6)",
      "rgba(227, 163, 255, 0.6)",
      "rgba(154, 193, 230, 0.6)"
    ];
    this.blobCount = 7;
    this.isPaused = false;

    this.init();


    this.mouseBlob = this.createBlob("rgba(140, 100, 255, 0.8)", 300);
    this.mouseBlob.el.style.zIndex = "10";
    this.mouseBlob.el.style.mixBlendMode = "screen";

    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
    this.currentMouseX = this.mouseX;
    this.currentMouseY = this.mouseY;

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });


    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.isPaused = true;
      } else {
        this.isPaused = false;
        requestAnimationFrame(this.animate);
      }
    });

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  init() {
    this.container.innerHTML = '';
    for (let i = 0; i < this.blobCount; i++) {
      const color = this.colors[i % this.colors.length];
      const size = 300 + Math.random() * 200;
      const blob = new WanderingBlob(this.container, color, size);
      this.blobs.push(blob);
    }
  }

  createBlob(color, size) {
    const el = document.createElement("div");
    el.classList.add("blob");
    el.style.background = color;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    this.container.appendChild(el);
    return { el, size };
  }

  animate(time) {
    if (this.isPaused) return;


    this.blobs.forEach(blob => blob.update(time));


    this.currentMouseX += (this.mouseX - this.currentMouseX) * 0.08;
    this.currentMouseY += (this.mouseY - this.currentMouseY) * 0.08;

    const mouseSizeHalf = this.mouseBlob.size / 2;
    const x = this.currentMouseX - mouseSizeHalf;
    const y = this.currentMouseY - mouseSizeHalf;


    const scale = 1 + Math.sin(time * 0.002) * 0.08;

    this.mouseBlob.el.style.transform =
      `translate3d(${x}px, ${y}px, 0) scale(${scale})`;

    requestAnimationFrame(this.animate);
  }
}

class WanderingBlob {
  constructor(container, color, size) {
    this.el = document.createElement("div");
    this.el.classList.add("blob");
    this.el.style.background = color;
    this.el.style.width = `${size}px`;
    this.el.style.height = `${size}px`;
    container.appendChild(this.el);

    this.size = size;


    this.seedX = Math.random() * 1000;
    this.seedY = Math.random() * 1000;


    this.speedX = 0.0001 + Math.random() * 0.0002;
    this.speedY = 0.0001 + Math.random() * 0.0002;
  }

  update(time) {

    const tx = time * this.speedX + this.seedX;
    const ty = time * this.speedY + this.seedY;


    const xNorm = 0.5 + 0.5 * Math.sin(tx);
    const yNorm = 0.5 + 0.5 * Math.cos(ty);


    const rangeX = window.innerWidth + this.size;
    const rangeY = window.innerHeight + this.size;

    const finalX = (xNorm * rangeX) - this.size / 2 - (window.innerWidth < rangeX ? (rangeX - window.innerWidth) / 2 : 0);
    const finalY = (yNorm * rangeY) - this.size / 2 - (window.innerHeight < rangeY ? (rangeY - window.innerHeight) / 2 : 0);


    const screenX = (xNorm * (window.innerWidth + this.size)) - this.size / 2;
    const screenY = (yNorm * (window.innerHeight + this.size)) - this.size / 2;


    const scale = 1 + Math.sin(time * 0.0015 + this.seedX) * 0.15;

    this.el.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) scale(${scale})`;
  }
}


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new BlobSystem());
} else {
  new BlobSystem();
}