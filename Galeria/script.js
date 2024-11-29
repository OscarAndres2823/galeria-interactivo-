const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxCounter = document.getElementById('lightboxCounter');
const closeBtn = document.querySelector('.lightbox .close');
const nextBtn = document.querySelector('.lightbox .next');
const prevBtn = document.querySelector('.lightbox .prev');
const darkModeToggle = document.getElementById('darkModeToggle');
const musicToggle = document.getElementById('musicToggle');
const music = document.getElementById('backgroundMusic');
const filterButtons = document.querySelectorAll('.filters button');
const shareFacebook = document.getElementById('shareFacebook');
const shareTwitter = document.getElementById('shareTwitter');

let currentIndex = 0;

// Open Lightbox
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
  });
});

// Close Lightbox
closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('open');
});

// Update Lightbox Content
function updateLightbox() {
  lightboxImage.src = galleryItems[currentIndex].src;
  lightboxCaption.textContent = galleryItems[currentIndex].alt;
  lightboxCounter.textContent = `Imagen ${currentIndex + 1} de ${galleryItems.length}`;
  shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${lightboxImage.src}`;
  shareTwitter.href = `https://twitter.com/intent/tweet?url=${lightboxImage.src}`;
}

// Navigation
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  updateLightbox();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  updateLightbox();
});

// Zoom on Image
lightboxImage.addEventListener('click', () => {
  lightboxImage.classList.toggle('zoomed');
});

// Dark Mode
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Music Control
musicToggle.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    musicToggle.textContent = 'Pausar Música';
  } else {
    music.pause();
    musicToggle.textContent = 'Reproducir Música';
  }
});

// Filters
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    galleryItems.forEach(item => {
      const category = item.closest('.gallery-item').dataset.category;
      item.closest('.gallery-item').style.display =
        filter === 'all' || filter === category ? '' : 'none';
    });
  });
});

// Keyboard Navigation
document.addEventListener('keydown', (event) => {
  if (lightbox.classList.contains('open')) {
    if (event.key === 'ArrowRight') nextBtn.click();
    if (event.key === 'ArrowLeft') prevBtn.click();
    if (event.key === 'Escape') closeBtn.click();
  }
});
