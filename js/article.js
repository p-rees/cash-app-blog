    <!-- JavaScript -->
    <script>
        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe all animatable elements
        document.querySelectorAll('.article-card').forEach(el => {
            observer.observe(el);
        });

        // Copy link functionality
        function copyLink() {
            navigator.clipboard.writeText(window.location.href)
                .then(() => {
                    const button = document.querySelector('button.share-button');
                    const originalText = button.textContent;
                    button.textContent = 'Link Copied!';
                    setTimeout(() => {
                        button.textContent = originalText;
                    }, 2000);
                });
        }

        // Video player functionality
        function playVideo(element) {
            const wrapper = element.parentElement;
            const iframe = wrapper.querySelector('.video-iframe');
            const preview = wrapper.querySelector('.video-preview');
            
            // Replace 'about:blank' with actual video URL
            iframe.querySelector('iframe').src = 'https://www.youtube.com/embed/VIDEO_ID?autoplay=1';
            
            // Hide preview, show iframe
            preview.style.display = 'none';
            iframe.style.display = 'block';
        }
    </script>