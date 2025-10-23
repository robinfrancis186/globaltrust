// Simple Fade-in Animation System
document.addEventListener('DOMContentLoaded', function() {
  // Small delay to ensure DOM is fully loaded
  setTimeout(function() {
    // First, hide all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element) => {
      element.classList.add('js-loaded');
    });

    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
      // Create intersection observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing this element (animation only triggers once)
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before element is fully in view
      });

      // Observe all fade-in elements
      fadeElements.forEach((element) => {
        observer.observe(element);
      });
    } else {
      // Fallback for browsers without Intersection Observer
      fadeElements.forEach((element) => {
        element.classList.add('visible');
      });
    }
  }, 100); // Small delay to ensure everything is loaded
});
