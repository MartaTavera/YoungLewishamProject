/**
 * Newsletter Modal Controller
 * Handles opening/closing the newsletter signup modal
 */

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
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new NewsletterModal();
    });
  } else {
    new NewsletterModal();
  }