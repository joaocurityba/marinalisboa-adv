document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // Elements
  const header = document.getElementById('main-header');
  const logoText = document.getElementById('logo-text');
  const logoSubtext = document.getElementById('logo-subtext');
  const navLinks = document.querySelectorAll('.nav-link');
  const navCta = document.getElementById('nav-cta');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const currentYearSpan = document.getElementById('current-year');

  // Set Current Year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Header Scroll Effect
  function handleScroll() {
    if (window.scrollY > 20) {
      header.classList.remove('bg-transparent', 'py-6');
      header.classList.add('bg-[#fcfbf9]/95', 'backdrop-blur-md', 'shadow-sm', 'py-4');
      
      logoText.classList.remove('text-white');
      logoText.classList.add('text-primary-900');
      
      logoSubtext.classList.remove('text-accent-500');
      logoSubtext.classList.add('text-accent-600');

      navLinks.forEach(link => {
        link.classList.remove('text-stone-200', 'hover:text-white');
        link.classList.add('text-stone-600', 'hover:text-primary-900');
      });

      navCta.classList.remove('bg-white', 'text-primary-900', 'hover:bg-stone-100');
      navCta.classList.add('bg-primary-900', 'text-white', 'hover:bg-primary-800');

      mobileMenuBtn.classList.remove('text-white');
      mobileMenuBtn.classList.add('text-primary-900');
    } else {
      header.classList.remove('bg-[#fcfbf9]/95', 'backdrop-blur-md', 'shadow-sm', 'py-4');
      header.classList.add('bg-transparent', 'py-6');
      
      logoText.classList.remove('text-primary-900');
      logoText.classList.add('text-white');
      
      logoSubtext.classList.remove('text-accent-600');
      logoSubtext.classList.add('text-accent-500');

      navLinks.forEach(link => {
        link.classList.remove('text-stone-600', 'hover:text-primary-900');
        link.classList.add('text-stone-200', 'hover:text-white');
      });

      navCta.classList.remove('bg-primary-900', 'text-white', 'hover:bg-primary-800');
      navCta.classList.add('bg-white', 'text-primary-900', 'hover:bg-stone-100');

      mobileMenuBtn.classList.remove('text-primary-900');
      mobileMenuBtn.classList.add('text-white');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // Mobile Menu Toggle
  function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
    if (mobileMenu.classList.contains('hidden')) {
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    } else {
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    }
  }

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove animation classes to trigger reveal
        entry.target.classList.remove('opacity-0', 'translate-y-8', '-translate-x-8', 'translate-x-8', 'scale-95');
        // Unobserve after revealing as per framer "once: true"
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll('.scroll-reveal');
  elementsToAnimate.forEach(el => observer.observe(el));
});
