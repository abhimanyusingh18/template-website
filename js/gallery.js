// ============================================
// GALLERY & LIGHTBOX FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // GALLERY FILTERING
    // ============================================
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ============================================
    // LIGHTBOX FUNCTIONALITY
    // ============================================
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentImageIndex = 0;
    let visibleImages = [];

    // Function to get all visible gallery images
    function updateVisibleImages() {
        visibleImages = Array.from(document.querySelectorAll('.gallery-item'))
            .filter(item => item.style.display !== 'none')
            .map(item => ({
                src: item.querySelector('img').getAttribute('data-full') || item.querySelector('img').src,
                caption: item.querySelector('img').alt
            }));
    }

    // Open lightbox
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');

        img.addEventListener('click', function () {
            updateVisibleImages();

            // Find the index in visible images
            const imgSrc = this.getAttribute('data-full') || this.src;
            currentImageIndex = visibleImages.findIndex(image => image.src === imgSrc);

            showLightboxImage(currentImageIndex);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Show image in lightbox
    function showLightboxImage(index) {
        if (visibleImages.length === 0) return;

        const image = visibleImages[index];
        lightboxImage.src = image.src;
        lightboxCaption.textContent = image.caption;

        // Update navigation buttons visibility
        if (visibleImages.length <= 1) {
            lightboxPrev.style.display = 'none';
            lightboxNext.style.display = 'none';
        } else {
            lightboxPrev.style.display = 'block';
            lightboxNext.style.display = 'block';
        }
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Navigate to previous image
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function (e) {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
            showLightboxImage(currentImageIndex);
        });
    }

    // Navigate to next image
    if (lightboxNext) {
        lightboxNext.addEventListener('click', function (e) {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
            showLightboxImage(currentImageIndex);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
            showLightboxImage(currentImageIndex);
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
            showLightboxImage(currentImageIndex);
        }
    });

    // ============================================
    // LAZY LOADING FOR GALLERY IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // ============================================
    // TOUCH SWIPE SUPPORT FOR LIGHTBOX (Mobile)
    // ============================================
    let touchStartX = 0;
    let touchEndX = 0;

    if (lightbox) {
        lightbox.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        lightbox.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);

        function handleSwipe() {
            const swipeThreshold = 50;

            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next image
                currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
                showLightboxImage(currentImageIndex);
            }

            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous image
                currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
                showLightboxImage(currentImageIndex);
            }
        }
    }

});
