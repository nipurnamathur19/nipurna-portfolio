document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. CARD & BOX CLICK ANIMATION WITH DYNAMIC SHADOW & PRESS EFFECT
     ========================================================================== */
  // Select all interactive cards/boxes across the website
  const interactiveBoxes = document.querySelectorAll('.card, .process-step, .hero-card');

  interactiveBoxes.forEach(box => {
    // Add styling for smooth animation transition
    box.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, border-color 0.2s ease';
    box.style.cursor = 'pointer';

    // Desktop: Mouse Press (Down)
    box.addEventListener('mousedown', () => {
      triggerClickAnimation(box);
    });

    // Desktop: Mouse Release (Up)
    box.addEventListener('mouseup', () => {
      releaseClickAnimation(box);
    });

    // Desktop: Mouse Leave (if dragged outside while clicking)
    box.addEventListener('mouseleave', () => {
      releaseClickAnimation(box);
    });

    // Mobile & Tablet: Touch Start (Responsive Touch Feedback)
    box.addEventListener('touchstart', (e) => {
      triggerClickAnimation(box);
    }, { passive: true });

    // Mobile & Tablet: Touch End
    box.addEventListener('touchend', () => {
      releaseClickAnimation(box);
    }, { passive: true });

    // Open Modal Details when clicking Project or Service Cards
    box.addEventListener('click', () => {
      const title = box.querySelector('h3, h4')?.innerText || 'Portfolio Section';
      const desc = box.querySelector('p')?.innerText || 'Explore detailed specs and design decisions for this component.';
      
      openModal(title, desc);
    });
  });

  // Helper functions for click press/shadow state
  function triggerClickAnimation(element) {
    element.style.transform = 'scale(0.97) translateY(2px)';
    element.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.25)';
    element.style.borderColor = '#6366f1';
  }

  function releaseClickAnimation(element) {
    element.style.transform = '';
    element.style.boxShadow = '';
    element.style.borderColor = '';
  }


  /* ==========================================================================
     2. RESPONSIVE POP-UP MODAL ANIMATION CONTROLLER
     ========================================================================== */
  const modal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDescription');

  function openModal(titleText, descText) {
    if (!modal) return;

    if (modalTitle) modalTitle.innerText = titleText;
    if (modalDesc) modalDesc.innerText = descText;

    // Show modal overlay with active class
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeModal() {
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore background scrolling
  }

  // Close when clicking the 'X' button
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Close when clicking outside the box container
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });


  /* ==========================================================================
     3. SMOOTH NAVIGATION SCROLLING
     ========================================================================== */
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});
