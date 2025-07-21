document.addEventListener('DOMContentLoaded', function() {
    // Prevent multiple script executions
    if (window.finaFeelsLoaded) {
        return;
    }
    window.finaFeelsLoaded = true;
    
    // Console welcome message
    console.log('%c Welcome to FinaFeels! ', 'background: #4B206D; color: white; padding: 10px; border-radius: 5px; font-size: 16px;');
    console.log('%c Fashion. AI. Creativity. Solutions. ', 'color: #4B206D; font-size: 14px;');

    // Only run homepage-specific code if we're on the homepage
    const isHomepage = window.location.pathname === '/' || 
                      window.location.pathname.endsWith('index.html') || 
                      window.location.pathname === '/index.html';

    if (isHomepage) {
        // Declare carousel interval variable first
        let carouselInterval = null;
        
        // Preload carousel images with loading states
        const carouselImages = [
            'assets/images/fina1.jpg',
            'assets/images/fina2.jpg',
            'assets/images/fina3.jpg',
            'assets/images/fina4.jpg',
            'assets/images/fina5.jpg'
        ];
        
        let loadedImages = 0;
        const totalImages = carouselImages.length;
        
        carouselImages.forEach((src, index) => {
            const img = new Image();
            img.onload = function() {
                loadedImages++;
                const slide = document.querySelector(`.carousel-slide:nth-child(${index + 1})`);
                if (slide) {
                    slide.classList.add('loaded');
                    slide.style.backgroundImage = `url('${src}')`;
                }
                
                // Start carousel only when all images are loaded
                if (loadedImages === totalImages && !carouselInterval) {
                    if (isMobile()) {
                        startCarousel();
                    }
                }
            };
            img.src = src;
        });

        // Image carousel for Fina Section with crossfade
        const finaCarousel = document.getElementById('fina-carousel');
        const carouselContainer = document.querySelector('.carousel-container');
        const dots = document.querySelectorAll('.dot');

        if (finaCarousel && carouselContainer && dots.length > 0) {
            let currentSlide = 0;
            let isPaused = false;
            let slides = document.querySelectorAll('.carousel-slide');

            // Initialize slides with proper opacity and remove background images
            slides.forEach((slide, index) => {
                slide.style.opacity = index === 0 ? '1' : '0';
                slide.style.position = 'absolute';
                slide.style.top = '0';
                slide.style.left = '0';
                slide.style.width = '100%';
                slide.style.height = '100%';
                slide.style.transition = 'opacity 0.8s ease-in-out';
                slide.style.zIndex = index === 0 ? '2' : '1';
                // Remove inline background images to prevent flash
                slide.style.backgroundImage = 'none';
            });

            // Reset container styles for crossfade
            carouselContainer.style.transform = 'none';
            carouselContainer.style.width = '100%';
            carouselContainer.style.position = 'relative';

            function goToSlide(slideIndex) {
                const currentSlideElement = slides[currentSlide];
                const nextSlideElement = slides[slideIndex];
                
                // Crossfade transition
                currentSlideElement.style.opacity = '0';
                currentSlideElement.style.zIndex = '1';
                nextSlideElement.style.opacity = '1';
                nextSlideElement.style.zIndex = '2';
                
                currentSlide = slideIndex;
                
                // Update dots
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
            }

            function nextSlide() {
                if (!isPaused) {
                    const nextIndex = (currentSlide + 1) % 5;
                    goToSlide(nextIndex);
                }
            }

            function startCarousel() {
                if (!carouselInterval) {
                    carouselInterval = setInterval(nextSlide, 4000);
                }
            }

            function stopCarousel() {
                if (carouselInterval) {
                    clearInterval(carouselInterval);
                    carouselInterval = null;
                }
            }

            // Dot click handlers
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    goToSlide(index);
                });
            });

            // Mobile and desktop interaction handlers
            function isMobile() {
                return window.innerWidth <= 768;
            }

            if (isMobile()) {
                // On mobile, start carousel immediately and let it run
                startCarousel();
                
                // Add touch handlers for better mobile experience
                let touchStartX = 0;
                let touchEndX = 0;
                
                finaCarousel.addEventListener('touchstart', function(e) {
                    touchStartX = e.changedTouches[0].screenX;
                });
                
                finaCarousel.addEventListener('touchend', function(e) {
                    touchEndX = e.changedTouches[0].screenX;
                    handleSwipe();
                });
                
                function handleSwipe() {
                    const swipeThreshold = 50;
                    const diff = touchStartX - touchEndX;
                    
                    if (Math.abs(diff) > swipeThreshold) {
                        if (diff > 0) {
                            // Swipe left - next slide
                            nextSlide();
                        } else {
                            // Swipe right - previous slide
                            const prevIndex = currentSlide === 0 ? 4 : currentSlide - 1;
                            goToSlide(prevIndex);
                        }
                    }
                }
            } else {
                // Desktop: hover handlers
                finaCarousel.addEventListener('mouseenter', startCarousel);
                finaCarousel.addEventListener('mouseleave', stopCarousel);
            }
        }

        // Video rotation for Studio Section with smooth transitions
        const studioSection = document.querySelector('.studio-section');
        const studioVideo = document.querySelector('.studio-video');

        if (studioSection && studioVideo) {
            const studioVideos = [
                'assets/videos/studio1.mp4',
                'assets/videos/studio2.mp4'
            ];
            let currentVideoIndex = 0;
            let videoRotationInterval = null;
            let isVideoPlaying = false;
            let videoElements = [];

            // Create two video elements for smooth crossfade
            function initializeVideos() {
                studioVideos.forEach((src, index) => {
                    const video = document.createElement('video');
                    video.src = src;
                    video.muted = true;
                    video.loop = true;
                    video.autoplay = true;
                    video.playsInline = true;
                    video.disablePictureInPicture = true;
                    video.controls = false;
                    video.setAttribute('playsinline', '');
                    video.setAttribute('webkit-playsinline', '');
                    video.setAttribute('disablepictureinpicture', '');
                    video.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        opacity: ${index === 0 ? '0.8' : '0'};
                        transition: opacity 0.8s ease-in-out;
                        z-index: ${index === 0 ? '2' : '1'};
                        pointer-events: none;
                    `;
                    video.classList.add('studio-video-element');
                    studioSection.appendChild(video);
                    videoElements.push(video);
                    
                    // Preload the video
                    video.load();
                });
                
                // Remove the original video element
                if (studioVideo) {
                    studioVideo.remove();
                }
            }

            function switchStudioVideo() {
                const currentVideo = videoElements[currentVideoIndex];
                currentVideoIndex = (currentVideoIndex + 1) % studioVideos.length;
                const nextVideo = videoElements[currentVideoIndex];
                
                // Crossfade transition
                currentVideo.style.opacity = '0';
                currentVideo.style.zIndex = '1';
                nextVideo.style.opacity = '0.8';
                nextVideo.style.zIndex = '2';
                
                // Sync video playback
                if (isVideoPlaying) {
                    nextVideo.play().catch(() => {});
                }
            }

            function startVideoRotation() {
                if (!videoRotationInterval) {
                    videoRotationInterval = setInterval(switchStudioVideo, 4500);
                }
            }

            function stopVideoRotation() {
                if (videoRotationInterval) {
                    clearInterval(videoRotationInterval);
                    videoRotationInterval = null;
                }
            }

            // Initialize the video system
            initializeVideos();
            
            if (isMobile()) {
                // On mobile, start videos immediately
                isVideoPlaying = true;
                videoElements.forEach(video => {
                    video.play().catch(() => {});
                });
                startVideoRotation();
                
                // Add touch handler for mobile interaction
                studioSection.addEventListener('touchstart', function() {
                    switchStudioVideo();
                });
            } else {
                // Desktop: hover handlers
                studioSection.addEventListener('mouseenter', function() {
                    isVideoPlaying = true;
                    videoElements.forEach(video => {
                        video.play().catch(() => {});
                    });
                    startVideoRotation();
                });
                
                studioSection.addEventListener('mouseleave', function() {
                    isVideoPlaying = false;
                    videoElements.forEach(video => {
                        video.pause();
                    });
                    stopVideoRotation();
                });
            }
        }
    } // End of homepage-specific code

    // Universal code for all pages
    try {
        // Scroll Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const animateElements = document.querySelectorAll('.service-card, .magazine-card, .about-text, .about-image');
        animateElements.forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            }
        });

        // Service Card Hover Effects
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            if (card) {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                });
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            }
        });

        // Magazine Card Effects
        const magazineCards = document.querySelectorAll('.magazine-card');
        magazineCards.forEach(card => {
            if (card) {
                card.addEventListener('click', function(e) {
                    e.preventDefault();
                    const overlay = this.querySelector('.construction-overlay');
                    if (overlay) {
                        overlay.style.opacity = '1';
                        const message = document.createElement('div');
                        message.textContent = 'Coming Soon!';
                        message.style.cssText = `
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            background: var(--deep-purple);
                            color: white;
                            padding: 20px 40px;
                            border-radius: 50px;
                            font-weight: 600;
                            z-index: 10000;
                            animation: fadeInOut 2s ease-in-out;
                        `;
                        document.body.appendChild(message);
                        setTimeout(() => {
                            if (document.body.contains(message)) {
                                document.body.removeChild(message);
                            }
                            overlay.style.opacity = '0';
                        }, 2000);
                    }
                });
            }
        });

        // Parallax Effect
        const hero = document.querySelector('.hero');
        const heroImage = document.querySelector('.hero-image img');
        if (hero && heroImage) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                if (scrolled < hero.offsetHeight) {
                    heroImage.style.transform = `translateY(${rate}px)`;
                }
            });
        }

        // Button Effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            if (button) {
                button.addEventListener('click', function(e) {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;

                    ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple 0.6s linear;
                        pointer-events: none;
                    `;

                    this.style.position = 'relative';
                    this.style.overflow = 'hidden';
                    this.appendChild(ripple);

                    setTimeout(() => {
                        if (this.contains(ripple)) {
                            ripple.remove();
                        }
                    }, 600);
                });
            }
        });

    } catch (error) {
        // Silent error handling
        console.log('FinaFeels: Some elements not found on this page');
    }

    // No loading animations needed

    // Form Validation (if contact forms are added later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Utility function for smooth animations
    function animateCSS(element, animationName, callback) {
        const node = document.querySelector(element);
        if (node) {
            node.classList.add('animated', animationName);

            function handleAnimationEnd() {
                node.classList.remove('animated', animationName);
                node.removeEventListener('animationend', handleAnimationEnd);

                if (typeof callback === 'function') callback();
            }

            node.addEventListener('animationend', handleAnimationEnd);
        }
    }
});

// CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    .animated {
        animation-duration: 1s;
        animation-fill-mode: both;
    }
    .fadeInUp {
        animation-name: fadeInUp;
    }
`;
document.head.appendChild(style);