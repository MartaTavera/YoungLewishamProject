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
