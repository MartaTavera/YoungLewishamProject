// Newsletter Modal Controller
class NewsletterModal {
    constructor(modalSelector = '#newsletter-modal', openBtnSelector = '#openModalBtn', closeBtnSelector = '#closeModalBtn') {
      this.modal = document.getElementById(modalSelector.replace('#', ''));
      this.openBtn = document.getElementById(openBtnSelector.replace('#', ''));
      this.closeBtn = document.getElementById(closeBtnSelector.replace('#', ''));
      
      if (!this.modal || !this.openBtn || !this.closeBtn) {
        console.warn('NewsletterModal: Required elements not found');
        return;
      }
      
      this.init();
    }
  
    init() {
      // Open modal
      this.openBtn.addEventListener('click', () => this.open());
      // Close modal
      this.closeBtn.addEventListener('click', () => this.close());
      // Close when clicking outside modal
      window.addEventListener('click', (event) => {
        if (event.target === this.modal) {
          this.close();
        }
      });
    }
  
    open() {
      this.modal.classList.add('show');
    }
  
    close() {
      this.modal.classList.remove('show');
    }
  }
  
  // Load navbar
  fetch('navbar.html')
      .then(response => response.text())
      .then(data => {
          document.getElementById('navbar-placeholder').innerHTML = data;
          
          // Highlight active page
          const currentPage = window.location.pathname.split('/').pop() || 'index.html';
          const links = document.querySelectorAll('.nav-links a');
          links.forEach(link => {
              if (link.getAttribute('href') === currentPage) {
                  link.classList.add('active');
              }
          });
      });
  
  // Load footer
  fetch('footer.html')
      .then(response => response.text())
      .then(data => {
          document.getElementById('footer-placeholder').innerHTML = data;
          // Initialize modal AFTER footer is loaded
          new NewsletterModal();
      });
  
  // Burger menu functions
  function toggleMenu() {
      const navLinks = document.getElementById('navLinks');
      const burger = document.querySelector('.burger-menu');
      if (navLinks && burger) {
          navLinks.classList.toggle('active');
          burger.classList.toggle('active');
      }
  }
  
  // Make toggleMenu available globally
  window.toggleMenu = toggleMenu;
  
  // Close menu when clicking a link
  document.addEventListener('DOMContentLoaded', function() {
      // Wait a bit for navbar to load
      setTimeout(() => {
          document.querySelectorAll('.nav-links a').forEach(link => {
              link.addEventListener('click', () => {
                  const navLinks = document.getElementById('navLinks');
                  const burger = document.querySelector('.burger-menu');
                  if (navLinks && burger) {
                      navLinks.classList.remove('active');
                      burger.classList.remove('active');
                  }
              });
          });
      }, 100);
  });
  
  // Star rating