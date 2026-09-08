// Clients marquee — infinite auto-scrolling strip of client names
const marqueeClientNames = [
  'Starbucks', 'Al Habtoor Palace', 'Velvet Bar & Cafe', 'Avalon Hotel & Spa', '42 Restaurant',
  'Mariott Hotel', 'Gemini Bar', 'The Moss', 'PizzaMe', 'Simon’s burger',
  'Valley Budapest', 'Sauska Tokaj', 'Trattoria Brunello', 'Infitiny Hotel Budapest', 'Türkiz',
  'Hunguest Hotels', 'Hotel memories OldTown', '84 Bistro', 'Buds Budapest dinner cruise', 'Punto bistro',
  'Furia', 'Rose Restaurant', 'Next Bistro', 'Cafe Muse', 'Liz & Chain rooftop bar',
  'River Diva', 'CAT bar', 'Il Sole Ristorante'
];
const clientsMarquee = document.getElementById('clientsMarquee');
const marqueeItemsHtml = marqueeClientNames
  .map(name => `<span class="marquee-item">${name}</span><span class="marquee-sep">&#9670;</span>`)
  .join('');
clientsMarquee.innerHTML = marqueeItemsHtml + marqueeItemsHtml;

// Featured Projects — carousel + per-project lightbox
const projects = [
  { key: 'restaurant', photos: ['42-1.JPG', 'cortez1.JPG','moss6.JPG','moss7.JPG','pizza2.JPG'] },
  { key: 'hotel', photos: ['habtoor1.JPG','habtoor4.JPG','merriott4.jpeg','merriott1.jpeg','moss2.JPG'] },
  { key: 'bar', photos: ['velvet3.jpg',  'avalon1.jpeg','tenebris4.JPG','tenebris1.JPG','gemini3.jpg'] },
  { key: 'cafe', photos: ['muse1.jpg','muse3.jpg','velvet4.jpg','velvet3.jpg',''] }
];

const projectsTrack = document.getElementById('projectsTrack');
function renderProjectCards(){
  projectsTrack.innerHTML = '';
  projects.forEach((project, i) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-card-frame">
        <img src="${project.photos[0]}" alt="${RokoI18n.t('project_' + project.key)}">
      </div>
      <div class="project-name" data-i18n="project_${project.key}">${RokoI18n.t('project_' + project.key)}</div>
      <button type="button" class="project-view-btn" data-project="${i}" data-i18n="viewProjectBtn">${RokoI18n.t('viewProjectBtn')}</button>
    `;
    projectsTrack.appendChild(card);
  });
}
renderProjectCards();

// Carousel arrows — scroll by one card width at a time
const arrowLeft = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');
const carouselWrap = document.querySelector('.carousel-wrap');
function cardScrollStep(){
  const card = projectsTrack.querySelector('.project-card');
  if(!card) return 300;
  const style = getComputedStyle(projectsTrack);
  const gap = parseFloat(style.gap) || 20;
  return card.getBoundingClientRect().width + gap;
}
arrowLeft.addEventListener('click', () => {
  projectsTrack.scrollBy({ left: -cardScrollStep(), behavior: 'smooth' });
});
arrowRight.addEventListener('click', () => {
  projectsTrack.scrollBy({ left: cardScrollStep(), behavior: 'smooth' });
});

// When every card fits on screen, center them and hide the arrows —
// scrolling only makes sense (and only stays visually safe) once content overflows.
function updateCarouselOverflow(){
  const overflowing = projectsTrack.scrollWidth > projectsTrack.clientWidth + 1;
  carouselWrap.classList.toggle('no-overflow', !overflowing);
}
window.addEventListener('resize', updateCarouselOverflow);
updateCarouselOverflow();

// Lightbox — opens a project's own photo set with prev/next
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentProject = null;
let currentPhoto = 0;

function openLightbox(projectIndex){
  currentProject = projects[projectIndex];
  currentPhoto = 0;
  updateLightbox();
  lightbox.classList.add('open');
}
function updateLightbox(){
  lightboxImg.src = currentProject.photos[currentPhoto];
  lightboxCaption.textContent = `${RokoI18n.t('project_' + currentProject.key)} — ${currentPhoto + 1}/${currentProject.photos.length}`;
}
function closeLightbox(){
  lightbox.classList.remove('open');
  currentProject = null;
}

projectsTrack.addEventListener('click', (e) => {
  const btn = e.target.closest('.project-view-btn');
  if(!btn) return;
  openLightbox(Number(btn.dataset.project));
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });
lightboxPrev.addEventListener('click', () => {
  if(!currentProject) return;
  currentPhoto = (currentPhoto - 1 + currentProject.photos.length) % currentProject.photos.length;
  updateLightbox();
});
lightboxNext.addEventListener('click', () => {
  if(!currentProject) return;
  currentPhoto = (currentPhoto + 1) % currentProject.photos.length;
  updateLightbox();
});
document.addEventListener('keydown', (e) => {
  if(!lightbox.classList.contains('open')) return;
  if(e.key === 'Escape') closeLightbox();
  if(e.key === 'ArrowLeft') lightboxPrev.click();
  if(e.key === 'ArrowRight') lightboxNext.click();
});

// Theme toggle — dots swap the whole page between light and dark
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
themeToggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  root.setAttribute('data-theme', isDark ? 'light' : 'dark');
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Hero columns — auto-cycle photos from rokoshots.hu every 1 second
const col1Images = [
  'A1.jpg',
  'A2.jpg',
  'A3.jpg',
  'A4.jpg',
  'A5.jpeg',
  'A6.jpg'
];
const col2Images = [
  'A7.jpg',
  'A8.jpeg',
  'A9.jpg',
  'A10.jpeg',
  'A11.jpeg',
  'A12.jpeg'
];

function startCycle(colId, images){
  const img = document.querySelector('#' + colId + ' img');
  let i = 0;
  setInterval(() => {
    i = (i + 1) % images.length;
    img.style.animation = 'none';
    img.offsetHeight; // force reflow to restart animation
    img.style.animation = '';
    img.src = images[i];
  }, 4000);
}
startCycle('col1', col1Images);
startCycle('col2', col2Images);

// Re-render dynamically-built project cards (and refresh the open lightbox
// caption) whenever the language changes — data-i18n only covers static markup.
document.addEventListener('rokoshots:langchange', () => {
  renderProjectCards();
  updateCarouselOverflow();
  if(currentProject) updateLightbox();
});
