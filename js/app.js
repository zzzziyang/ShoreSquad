// DOM Elements
const mapContainer = document.getElementById('map-container');
const weatherContainer = document.getElementById('weather-container');
const ctaButton = document.querySelector('.cta-button');

// Animation for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
});

// Placeholder for map initialization
function initMap() {
    // This will be implemented when we add the mapping service
    mapContainer.innerHTML = '<div class="placeholder">Map loading...</div>';
}

// Placeholder for weather data
function fetchWeather() {
    // This will be implemented when we add the weather API
    weatherContainer.innerHTML = '<div class="placeholder">Weather information loading...</div>';
}

// Initialize features
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    fetchWeather();

    // Add hover effect to CTA button
    ctaButton.addEventListener('mouseenter', () => {
        ctaButton.style.transform = 'translateY(-2px)';
    });

    ctaButton.addEventListener('mouseleave', () => {
        ctaButton.style.transform = 'translateY(0)';
    });
});
