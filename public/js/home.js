// scripts.js
const carouselImages = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-image');
let currentIndex = 0;
const totalImages = images.length;
const rotationInterval = 5000; // 5 seconds

function rotateImages() {
    currentIndex = (currentIndex + 1) % totalImages;
    const offset = currentIndex * -100;
    carouselImages.style.transform = `translateX(${offset}%)`;
}

// Rotate images every 5 seconds
setInterval(rotateImages, rotationInterval);
