  // Insira aqui o WhatsApp de atendimento: DDI + DDD + número, sem espaços ou símbolos.
  const WHATSAPP_NUMBER = '5585991990808';
  const baseMessage = 'Olá! Vim pelo site da Paxeirá Perfumes e gostaria de saber mais sobre ';

  document.querySelectorAll('.whatsapp-link').forEach(link => {
    link.addEventListener('click', event => {
      const product = link.dataset.product || 'os perfumes';
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(baseMessage + product + '.')}`;
      if (link.getAttribute('href') === '#contato' && !link.dataset.product) return;
      event.preventDefault();
      window.open(url, '_blank', 'noopener');
    });
  });

  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 28));

  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', isOpen);
    menuButton.textContent = isOpen ? '×' : '☰';
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { navLinks.classList.remove('open'); menuButton.textContent = '☰'; menuButton.setAttribute('aria-expanded', 'false'); }));

  const slides = [...document.querySelectorAll('.hero-slide')];
  const dots = [...document.querySelectorAll('.dot')];
  let currentSlide = 0;
  let autoplay;
  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  }
  function startAutoplay() { autoplay = setInterval(() => showSlide(currentSlide + 1), 5600); }
  function resetAutoplay() { clearInterval(autoplay); startAutoplay(); }
  dots.forEach((dot, index) => dot.addEventListener('click', () => { showSlide(index); resetAutoplay(); }));
  document.querySelector('.next').addEventListener('click', () => { showSlide(currentSlide + 1); resetAutoplay(); });
  document.querySelector('.prev').addEventListener('click', () => { showSlide(currentSlide - 1); resetAutoplay(); });
  startAutoplay();

  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const lightbox = document.querySelector('#lightbox');
  const lightboxImage = lightbox.querySelector('img');
  document.querySelectorAll('.gallery-item img').forEach(image => image.addEventListener('click', () => { lightboxImage.src = image.src; lightboxImage.alt = image.alt; lightbox.classList.add('show'); }));
  lightbox.addEventListener('click', event => { if (event.target === lightbox || event.target.tagName === 'BUTTON') lightbox.classList.remove('show'); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') lightbox.classList.remove('show'); });

  document.querySelector('#year').textContent = new Date().getFullYear();