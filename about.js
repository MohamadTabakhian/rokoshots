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

// About copy layout — only whole paragraphs sit beside the photo.
// Once the paragraphs beside it would run taller than the photo, the rest
// move to a full-width block below (photo + text side-by-side is a desktop-only layout).
const aboutGrid = document.querySelector('.about-page-grid');
const aboutPhoto = document.querySelector('.about-page-photo');
const aboutCopy = document.querySelector('.about-page-copy');

function layoutAboutCopy(){
  if(!aboutGrid || !aboutPhoto || !aboutCopy) return;

  // Reset: pull any previously-moved paragraphs back into the main copy block.
  const existingBelow = document.querySelector('.about-page-copy-below');
  if(existingBelow){
    while(existingBelow.firstChild) aboutCopy.appendChild(existingBelow.firstChild);
    existingBelow.remove();
  }

  // Side-by-side layout only kicks in at the same breakpoint as the CSS grid.
  if(window.innerWidth < 900) return;

  const photoHeight = aboutPhoto.getBoundingClientRect().height;
  const paragraphs = Array.from(aboutCopy.querySelectorAll('p'));
  const gap = 22;
  let usedHeight = 0;
  let splitIndex = paragraphs.length;

  for(let i = 0; i < paragraphs.length; i++){
    const pHeight = paragraphs[i].getBoundingClientRect().height;
    const next = usedHeight + (i === 0 ? 0 : gap) + pHeight;
    if(i > 0 && next > photoHeight){
      splitIndex = i;
      break;
    }
    usedHeight = next;
  }

  if(splitIndex < paragraphs.length){
    const belowWrap = document.createElement('div');
    belowWrap.className = 'wrap about-page-copy-below';
    paragraphs.slice(splitIndex).forEach(p => belowWrap.appendChild(p));
    aboutGrid.after(belowWrap);
  }
}

if(aboutGrid){
  const portraitImg = aboutPhoto.querySelector('img');
  if(portraitImg && !portraitImg.complete){
    portraitImg.addEventListener('load', layoutAboutCopy);
  }
  window.addEventListener('load', layoutAboutCopy);
  window.addEventListener('resize', () => {
    clearTimeout(window.__aboutLayoutTimer);
    window.__aboutLayoutTimer = setTimeout(layoutAboutCopy, 150);
  });
  // Translated copy runs longer/shorter than the original — recompute the split.
  document.addEventListener('rokoshots:langchange', () => setTimeout(layoutAboutCopy, 0));
  layoutAboutCopy();
}
