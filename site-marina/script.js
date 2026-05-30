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
      header.classList.add('bg-[#FBF8F4]/95', 'backdrop-blur-md', 'shadow-sm', 'py-4');
      
      logoText.classList.remove('text-white');
      logoText.classList.add('text-primary-950');
      
      logoSubtext.classList.remove('text-white', 'text-accent-500');
      logoSubtext.classList.add('text-accent-600');

      navLinks.forEach(link => {
        link.classList.remove('text-stone-200', 'hover:text-white', 'text-white/90', 'hover:text-white');
        link.classList.add('text-primary-950/90', 'hover:text-primary-950');
      });

      navCta.classList.remove('bg-white', 'text-primary-900', 'hover:bg-stone-100');
      navCta.classList.add('bg-primary-900', 'text-white', 'hover:bg-primary-800');

      mobileMenuBtn.classList.remove('text-white');
      mobileMenuBtn.classList.add('text-primary-900');
    } else {
      header.classList.remove('bg-transparent', 'py-6');
      header.classList.add('bg-[#FBF8F4]/95', 'backdrop-blur-md', 'shadow-sm', 'py-4');
      
      logoText.classList.remove('text-primary-900');
      logoText.classList.add('text-primary-950');
      
      logoSubtext.classList.remove('text-white');
      logoSubtext.classList.add('text-accent-600');

      navLinks.forEach(link => {
        link.classList.remove('text-stone-600', 'hover:text-primary-900', 'text-white/90', 'hover:text-white');
        link.classList.add('text-primary-950/90', 'hover:text-primary-950');
      });

      navCta.classList.remove('bg-white', 'text-primary-900', 'hover:bg-stone-100');
      navCta.classList.add('bg-primary-900', 'text-white', 'hover:bg-primary-800');

      mobileMenuBtn.classList.remove('text-primary-900');
      mobileMenuBtn.classList.add('text-primary-900');
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
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');
      const isInternalSectionLink = targetId && targetId.startsWith('#');

      if (isInternalSectionLink) {
        event.preventDefault();
      }

      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');

      if (!isInternalSectionLink) {
        return;
      }

      const targetSection = document.querySelector(targetId);

      if (!targetSection) {
        return;
      }

      const mobileHeaderOffset = header.offsetHeight + 8;
      const targetPosition = Math.max(
        0,
        targetSection.getBoundingClientRect().top + window.scrollY - mobileHeaderOffset
      );

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
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
