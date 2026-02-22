document.addEventListener('DOMContentLoaded', () => {
    // Product Gallery for the first product
    const productGalleryContainer = document.querySelector('.product-gallery-container');
    if (productGalleryContainer) {
        const galleryTrack = productGalleryContainer.querySelector('.product-gallery-track');
        const gallerySlides = Array.from(productGalleryContainer.querySelectorAll('.product-gallery-track img'));
        const prevBtn = productGalleryContainer.querySelector('.gallery-btn-prev');
        const nextBtn = productGalleryContainer.querySelector('.gallery-btn-next');
        const dots = Array.from(productGalleryContainer.querySelectorAll('.gallery-dot'));

        let currentGalleryIndex = 0;

        function goToGallerySlide(index) {
            if (index < 0) {
                currentGalleryIndex = gallerySlides.length - 1;
            } else if (index >= gallerySlides.length) {
                currentGalleryIndex = 0;
            } else {
                currentGalleryIndex = index;
            }
            galleryTrack.style.transform = `translateX(-${currentGalleryIndex * 100}%)`;
            updateGalleryDots();
        }

        function updateGalleryDots() {
            dots.forEach((dot, index) => {
                if (index === currentGalleryIndex) {
                    dot.classList.add('active', 'bg-white');
                    dot.classList.remove('bg-white/50');
                } else {
                    dot.classList.remove('active', 'bg-white');
                    dot.classList.add('bg-white/50');
                }
            });
        }

        prevBtn.addEventListener('click', () => {
            goToGallerySlide(currentGalleryIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            goToGallerySlide(currentGalleryIndex + 1);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToGallerySlide(index));
        });

        // Initial setup
        updateGalleryDots();

        // Optional: Swipe functionality for touch devices
        let touchStartX = 0;
        let touchEndX = 0;

        productGalleryContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        productGalleryContainer.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        });

        productGalleryContainer.addEventListener('touchend', () => {
            if (touchStartX - touchEndX > 50) { // Swiped left
                goToGallerySlide(currentGalleryIndex + 1);
            } else if (touchEndX - touchStartX > 50) { // Swiped right
                goToGallerySlide(currentGalleryIndex - 1);
            }
            touchStartX = 0;
            touchEndX = 0;
        });
    }


    // Existing scripts (Año actual, Header Scroll Effect, Mobile Menu Toggle, Scroll Reveal)
    // Año actual
    document.getElementById('year').textContent = new Date().getFullYear();

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    // Mobile Menu Toggle
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');
    const bars = [document.getElementById('bar1'), document.getElementById('bar2'), document.getElementById('bar3')];

    btn.addEventListener('click', () => {
        menu.classList.toggle('translate-x-full');
        bars[0].classList.toggle('rotate-45');
        bars[0].classList.toggle('translate-y-2');
        bars[1].classList.toggle('opacity-0');
        bars[2].classList.toggle('-rotate-45');
        bars[2].classList.toggle('-translate-y-2');
    });

    links.forEach(l => l.addEventListener('click', () => {
        menu.classList.add('translate-x-full');
        bars.forEach(b => b.classList.remove('rotate-45', '-rotate-45', 'translate-y-2', '-translate-y-2', 'opacity-0'));
    }));

    // Scroll Reveal
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});