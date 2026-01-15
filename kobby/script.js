// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const searchBtn = document.querySelector('.search-btn');
    const newsletterForm = document.querySelector('.newsletter');
    
    // Toggle mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change hamburger icon
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.header-content') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Search button functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchQuery = prompt('What would you like to search for?');
            if (searchQuery && searchQuery.trim() !== '') {
                alert(`Searching for: "${searchQuery.trim()}"\n\nNote: This is a demo. In a real implementation, this would redirect to search results.`);
                // In a real implementation, you would redirect to:
                // window.location.href = `search.html?q=${encodeURIComponent(searchQuery)}`;
            }
        });
    }
    
    // Newsletter form submission
    if (newsletterForm) {
        const newsletterInput = newsletterForm.querySelector('input[type="email"]');
        const newsletterBtn = newsletterForm.querySelector('.btn');
        
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = newsletterInput.value.trim();
            
            // Simple email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                alert('Please enter your email address.');
                newsletterInput.focus();
                return;
            }
            
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                newsletterInput.focus();
                return;
            }
            
            // Simulate subscription
            newsletterInput.value = '';
            alert(`Thank you for subscribing with: ${email}\nYou will receive updates about new educational resources.`);
            
            // In a real implementation, you would send this to a server:
            // fetch('/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
            //   .then(response => response.json())
            //   .then(data => alert('Subscription successful!'));
        });
    }
    
    // Smooth scroll for anchor links (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply smooth scroll for same-page anchors
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add active class to current page in navigation
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || 
                (currentPage === '' && linkHref === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Call on page load
    setActiveNavLink();
    
    // Add animation to stats counter (optional)
    function animateStats() {
        const statItems = document.querySelectorAll('.stat-item h3');
        
        statItems.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50; // 50 steps
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '+');
            }, 30);
        });
    }
    
    // Animate stats when they come into view
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
});