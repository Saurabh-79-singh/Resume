document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');

    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectCard = btn.closest('.project-card');

            // Get project data from data attributes
            const title = projectCard.dataset.title;
            const description = projectCard.dataset.description;
            const features = projectCard.dataset.features.split(',');
            const tech = projectCard.dataset.tech.split(',');
            const liveDemo = projectCard.dataset.liveDemo;
            const viewCode = projectCard.dataset.viewCode;
            const images = projectCard.dataset.images.split(',');

            // Populate modal
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-description').textContent = description;

            const featuresList = document.getElementById('modal-features');
            featuresList.innerHTML = '';
            features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature.trim();
                featuresList.appendChild(li);
            });

            const techStack = document.getElementById('modal-tech-stack');
            techStack.innerHTML = '';
            tech.forEach(techItem => {
                const span = document.createElement('span');
                span.textContent = techItem.trim();
                techStack.appendChild(span);
            });

            document.getElementById('modal-live-demo').href = liveDemo;
            document.getElementById('modal-view-code').href = viewCode;

            // Populate carousel
            const modalCarouselInner = document.querySelector('#project-modal .carousel-inner');
            modalCarouselInner.innerHTML = '';
            images.forEach((image, index) => {
                const div = document.createElement('div');
                div.className = `carousel-item${index === 0 ? ' active' : ''}`;
                const img = document.createElement('img');
                img.src = image;
                div.appendChild(img);
                modalCarouselInner.appendChild(div);
            });


            modal.style.display = 'flex';

            // Setup modal carousel navigation
            setupCarousel(modal.querySelector('.modal-carousel'));
        });
    });

    // Carousel functionality
    function setupCarousel(carouselElement) {
        const carouselInner = carouselElement.querySelector('.carousel-inner');
        const carouselItems = carouselInner.children;
        const prevButton = carouselElement.querySelector('.prev');
        const nextButton = carouselElement.querySelector('.next');
        let currentIndex = 0;

        function updateCarousel() {
            for (let i = 0; i < carouselItems.length; i++) {
                carouselItems[i].classList.remove('active');
            }
            carouselItems[currentIndex].classList.add('active');
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
                updateCarousel();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
                updateCarousel();
            });
        }
    }

    // Initialize all carousels on the page
    document.querySelectorAll('.pro-carousel').forEach(carousel => {
        setupCarousel(carousel);
    });
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Close with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});
