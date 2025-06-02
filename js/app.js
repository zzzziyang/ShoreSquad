// DOM Elements
const mapContainer = document.getElementById('map-container');
const weatherContainer = document.getElementById('weather-container');
const ctaButton = document.querySelector('.cta-button');

// Map variables
let map;
let markers = [];

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

// Map initialization
function initMap() {
    // Set initial coordinates (example: Singapore)
    const initialPosition = [1.3521, 103.8198];
    
    // Initialize map
    map = L.map('map-container').setView(initialPosition, 12);
    
    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add sample cleanup events (replace with real data later)
    const sampleEvents = [
        { position: [1.3099, 103.9102], title: "East Coast Beach Cleanup", date: "2025-06-15" },
        { position: [1.2971, 103.8354], title: "Sentosa Coastal Cleanup", date: "2025-06-22" }
    ];

    // Add markers for cleanup events
    sampleEvents.forEach(event => {
        const marker = L.marker(event.position)
            .bindPopup(`
                <h3>${event.title}</h3>
                <p>Date: ${event.date}</p>
                <button onclick="joinEvent('${event.title}')">Join Event</button>
            `)
            .addTo(map);
        markers.push(marker);
    });
}

// Weather data fetching
async function fetchWeather() {
    try {
        // Example: Get weather for Singapore
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Singapore&appid=${CONFIG.OPENWEATHER_API_KEY}&units=metric`
        );
        
        if (!response.ok) throw new Error('Weather data not available');
        
        const data = await response.json();
          weatherContainer.innerHTML = `
            <div class="weather-info">
                <h3>Current Weather in Singapore</h3>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
                <p>Temperature: ${Math.round(data.main.temp)}°C</p>
                <p>Feels like: ${Math.round(data.main.feels_like)}°C</p>
                <p>Conditions: ${data.weather[0].description}</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
                <p>Humidity: ${data.main.humidity}%</p>
            </div>
        `;
    } catch (error) {
        weatherContainer.innerHTML = '<div class="error">Weather information temporarily unavailable</div>';
        console.error('Weather fetch error:', error);
    }
}

// Event joining function
function joinEvent(eventTitle) {
    alert(`Thanks for joining ${eventTitle}! We'll send you the details soon.`);
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
