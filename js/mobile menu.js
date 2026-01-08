document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');

  console.log("Mobile Script Loaded. Hamburger found:", hamburger, "Nav found:", nav);

  if (hamburger && nav) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = nav.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isExpanded);


      const icon = hamburger.querySelector('i');
      if (icon) {
        icon.className = isExpanded ? 'fa fa-times' : 'fa fa-bars';
      }

      console.log("Menu toggled. Active:", isExpanded);
    });

    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        const icon = hamburger.querySelector('i');
        if (icon) icon.className = 'fa fa-bars';
      });
    });

    document.addEventListener('click', (e) => {
      if (nav.classList.contains('active') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        const icon = hamburger.querySelector('i');
        if (icon) icon.className = 'fa fa-bars';
      }
    });
  }
});
