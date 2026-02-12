// ===== Theme Toggle =====
(function() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

document.addEventListener('DOMContentLoaded', function() {

  // ===== Mobile Nav Toggle =====
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      mobileNav.classList.toggle('open');
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('open');
      });
    });
  }

  // ===== Theme Toggle =====
  document.querySelectorAll('.theme-toggle').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  });

  // ===== Sticky Header =====
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ===== Scroll Animations =====
  var fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeEls.forEach(function(el) { observer.observe(el); });
  } else {
    // Fallback: show everything
    fadeEls.forEach(function(el) { el.classList.add('visible'); });
  }

  // ===== FAQ Accordion =====
  document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.parentElement;
      item.classList.toggle('open');
    });
  });

  // ===== Contact Form =====
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]').value;
      var email = form.querySelector('[name="email"]').value;
      var subject = form.querySelector('[name="subject"]').value || 'Solar Inquiry';
      var message = form.querySelector('[name="message"]').value;
      var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;
      window.location.href = 'mailto:dbarnets@gmail.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }

});
