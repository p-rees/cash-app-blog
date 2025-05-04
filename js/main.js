// Main JavaScript file for Cash App Blog

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeCategoryFilters();
    initializeNewsletterForm();
    initializeShareButtons();
    initializeLoadMore();
});

// Navigation
function initializeNavigation() {
    const header = document.querySelector('.site-header');
    let lastScroll = 0;

    // Hide/show header on scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
}

// Category Filters
function initializeCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const articles = document.querySelectorAll('.article-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.textContent.toLowerCase();

            // Filter articles
            articles.forEach(article => {
                const articleCategory = article.querySelector('.category').textContent.toLowerCase();
                if (category === 'all' || category === articleCategory) {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            });
        });
    });
}

// Newsletter Form
function initializeNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            
            // Here you would typically send this to your backend
            console.log('Newsletter signup:', email);
            
            // Show success message
            alert('Thanks for subscribing!');
            form.reset();
        });
    }
}

// Share Buttons
function initializeShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.classList[1]; // twitter, linkedin, or copy-link
            const url = window.location.href;
            const title = document.title;
            
            switch(type) {
                case 'twitter':
                    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`);
                    break;
                case 'linkedin':
                    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`);
                    break;
                case 'copy-link':
                    navigator.clipboard.writeText(url).then(() => {
                        alert('Link copied to clipboard!');
                    });
                    break;
            }
        });
    });
}

// Load More Articles
function initializeLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // Here you would typically fetch more articles from your backend
            // For demo purposes, we'll just disable the button
            loadMoreBtn.disabled = true;
            loadMoreBtn.textContent = 'No more articles';
        });
    }
}

// Utility Functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});