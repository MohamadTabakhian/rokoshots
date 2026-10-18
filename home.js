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

function fullSrc(name){ return `optimized/full/${name}.jpg`; }
function thumbSrc(name){ return `optimized/thumb/${name}.jpg`; }

// Clients — trusted-by name cloud
const clientNames = [
  'Starbucks', 'Al Habtoor Palace', 'Velvet Bar & Cafe', 'Avalon Hotel & Spa', 'Gemini Bar',
  'The Club Avalon', '42 Restaurant', 'PizzaMe', 'SkyRose Bar', 'Cortez Restaurant',
  'Simon’s Burger', 'Marriott Hotel', 'The Moss', 'Tenebris Vodka', 'Café Muse', 'Valley Budapest',
  'Sauska Tokaj', 'Avalon Yacht', 'Infinity Hotel', 'Furia Restaurant', 'Hotel Memories OldTown',
  'BUDS Budapest', 'River Diva', 'Berek Kúria', 'Shiraz Restaurant', 'Il Sole Restaurant',
  'Vendiák Restaurant', '84 Bisztró', 'Next Bistro Debrecen', 'Pastel Café', 'Cat Budapest',
  'MONYO Brewing', 'Buffalo Trace'
];
const clientCloud = document.getElementById('clientCloud');
function renderClientCloud(){
  clientCloud.innerHTML = clientNames.map(name => {
    if(name === '42 Restaurant'){
      return `<span class="rk-client-name">42 Restaurant<span class="rk-michelin" data-i18n="michelinStarBadge">${RokoI18n.t('michelinStarBadge')}</span></span>`;
    }
    return `<span class="rk-client-name">${name}</span>`;
  }).join('');
}
renderClientCloud();

// Selected work — featured project cards with filter tabs + per-project lightbox
const workProjects = [
  { num:'01', categoryKey:'workCategoryHotel', filter:'hotels', title:'Infinity Hotel', photos:['infinity1','infinity2','infinity3','infinity4'] },
  { num:'02', categoryKey:'workCategoryRestaurant', filter:'dining', title:'The Club Avalon', photos:['avalon22-1','avalon22-2','avalon22-3','avalon22-4','avalon22-5'] },
  { num:'03', categoryKey:'workCategoryBrand', filter:'drinks', title:'Tenebris Vodka', photos:['tenebris1','tenebris2','tenebris3','tenebris4','tenebris5'] },
  { num:'04', categoryKey:'workCategoryHotel', filter:'hotels', title:'Avalon Hotel & Spa', photos:['avalon1','avalon2','avalon3','avalon4'] },
  { num:'05', categoryKey:'workCategoryHotel', filter:'hotels', title:'Al Habtoor Palace', photos:['habtoor1','habtoor2','habtoor3','habtoor4'] },
  { num:'06', categoryKey:'workCategoryBar', filter:'drinks', title:'Gemini Bar', photos:['gemini1','gemini2','gemini3','gemini4'] }
];

const workGrid = document.getElementById('workGrid');
let activeFilter = null;

function renderWorkGrid(){
  // Column index is tracked over visible cards only, so the row-stagger
  // animation stays aligned to the actual 3-col grid position when filtered.
  let visibleIndex = 0;
  workGrid.innerHTML = workProjects.map((p, i) => {
    const isHidden = activeFilter && p.filter !== activeFilter;
    const col = isHidden ? null : (visibleIndex++ % 3) + 1;
    return `
    <div class="rk-work-card${isHidden ? ' rk-hidden' : ''}" data-project="${i}"${col ? ` data-col="${col}"` : ''}>
      <div class="rk-work-card-frame">
        <img src="${fullSrc(p.photos[0])}" alt="${p.title}" loading="lazy">
      </div>
      <div class="rk-work-meta">${p.num} &middot; <span data-i18n="${p.categoryKey}">${RokoI18n.t(p.categoryKey)}</span></div>
      <div class="rk-work-name">${p.title}</div>
    </div>
  `;
  }).join('');
}
renderWorkGrid();

document.getElementById('workFilters').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-filter]');
  if(!btn) return;
  const filter = btn.dataset.filter;
  activeFilter = activeFilter === filter ? null : filter;
  document.querySelectorAll('#workFilters button').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === activeFilter);
  });
  renderWorkGrid();
});

// About teaser — split into words for the scroll-linked highlight effect.
// Re-run after langchange, since i18n resets textContent and wipes the spans.
const aboutTeaserText = document.querySelector('.rk-about-teaser-text');
function splitAboutTeaserWords(){
  if(!aboutTeaserText) return;
  const parts = [...aboutTeaserText.children]; // the <span> and <em>
  const total = parts.reduce((sum, part) => sum + part.textContent.trim().split(/\s+/).length, 0);
  let i = 0;
  parts.forEach(part => {
    const words = part.textContent.trim().split(/\s+/);
    part.textContent = '';
    words.forEach(word => {
      const span = document.createElement('span');
      span.className = 'rk-word';
      span.textContent = word;
      span.style.setProperty('--i', i);
      span.style.setProperty('--n', total);
      part.appendChild(span);
      part.appendChild(document.createTextNode(' '));
      i++;
    });
  });
}
// i18n's own initial translation pass also lands on DOMContentLoaded (see i18n.js),
// so defer the first split the same way — otherwise it runs before textContent
// is set and gets wiped out the moment translations apply.
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', splitAboutTeaserWords);
} else {
  splitAboutTeaserWords();
}

// Soft fade-up reveal for secondary content — plays once, then stops watching.
const fadeUpSelectors = '.rk-clients-heading, .rk-client-cloud, .rk-work-title, .ig-card, .rk-testimonials-head, .rk-testimonial, .rk-contact-heading, .rk-contact-info, #rkContactForm, .rk-about-teaser .rk-eyebrow, .rk-about-teaser-link';
if('IntersectionObserver' in window){
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('rk-fade-up-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold:.15 });
  document.querySelectorAll(fadeUpSelectors).forEach(el => {
    el.classList.add('rk-fade-up');
    fadeObserver.observe(el);
  });
}

// Plain photo grid — decorative gallery, no captions
const galleryImages = [
  'habtoor2','gemini2','velvet1','muse2','moss3','pizza1',
  'sauska2','cortez3','furia2','tenebris3','merriott2','star3',
  'sky2','valley4','yacht1'
];
const galleryGrid = document.getElementById('galleryGrid');
galleryGrid.innerHTML = galleryImages.map((name, i) => `
  <button type="button" class="rk-gallery-item" data-gallery="${i}">
    <img src="${thumbSrc(name)}" alt="" loading="lazy" decoding="async">
  </button>
`).join('');

// Instagram widget — static preview of recent posts, each tile links out
// to the real profile (no post-level API, so there's nothing to embed live)
const igImages = [
  'habtoor2','gemini2','velvet1','muse2','moss3','pizza1',
  'sauska2','cortez3','furia2','tenebris3','merriott2','star3',
  'sky2','valley4','yacht1'
];
const IG_PROFILE_URL = 'https://www.instagram.com/rokoshots';
const igTrack = document.getElementById('igTrack');
const igDots = document.getElementById('igDots');
const igPrev = document.getElementById('igPrev');
const igNext = document.getElementById('igNext');

igTrack.innerHTML = igImages.map(name => `
  <a class="ig-post" href="${IG_PROFILE_URL}" target="_blank" rel="noopener">
    <img src="${thumbSrc(name)}" alt="" loading="lazy" decoding="async">
  </a>
`).join('');
igDots.innerHTML = igImages.map((_, i) => `
  <button type="button" class="ig-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Go to post ${i + 1}"></button>
`).join('');

const igPosts = Array.from(igTrack.children);
const igDotEls = Array.from(igDots.children);

function updateIgActiveDot(){
  const trackLeft = igTrack.getBoundingClientRect().left;
  let closest = 0;
  let closestDist = Infinity;
  igPosts.forEach((post, i) => {
    const dist = Math.abs(post.getBoundingClientRect().left - trackLeft);
    if(dist < closestDist){ closestDist = dist; closest = i; }
  });
  igDotEls.forEach((dot, i) => dot.classList.toggle('active', i === closest));
}
igTrack.addEventListener('scroll', () => {
  clearTimeout(igTrack.__scrollTimer);
  igTrack.__scrollTimer = setTimeout(updateIgActiveDot, 80);
});
igDots.addEventListener('click', (e) => {
  const dot = e.target.closest('.ig-dot');
  if(!dot) return;
  igTrack.scrollTo({ left: igPosts[Number(dot.dataset.index)].offsetLeft, behavior: 'smooth' });
});
function igScrollByPage(dir){
  const postWidth = igPosts[0].getBoundingClientRect().width + 8; // matches .ig-track gap
  igTrack.scrollBy({ left: dir * postWidth * 2, behavior: 'smooth' });
}
igPrev.addEventListener('click', () => igScrollByPage(-1));
igNext.addEventListener('click', () => igScrollByPage(1));

// Shared lightbox — opens either a project's photo set or the plain gallery
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let activeSet = null; // { photos, caption(i) }
let activeIndex = 0;

function openLightbox(set, index){
  activeSet = set;
  activeIndex = index;
  updateLightbox();
  lightbox.classList.add('open');
}
function updateLightbox(){
  lightboxImg.src = fullSrc(activeSet.photos[activeIndex]);
  lightboxCaption.textContent = activeSet.caption(activeIndex);
}
function closeLightbox(){
  lightbox.classList.remove('open');
  activeSet = null;
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });
lightboxPrev.addEventListener('click', () => {
  if(!activeSet) return;
  activeIndex = (activeIndex - 1 + activeSet.photos.length) % activeSet.photos.length;
  updateLightbox();
});
lightboxNext.addEventListener('click', () => {
  if(!activeSet) return;
  activeIndex = (activeIndex + 1) % activeSet.photos.length;
  updateLightbox();
});
document.addEventListener('keydown', (e) => {
  if(!lightbox.classList.contains('open')) return;
  if(e.key === 'Escape') closeLightbox();
  if(e.key === 'ArrowLeft') lightboxPrev.click();
  if(e.key === 'ArrowRight') lightboxNext.click();
});

workGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.rk-work-card');
  if(!card) return;
  const project = workProjects[Number(card.dataset.project)];
  openLightbox({
    photos: project.photos,
    caption: (i) => `${project.title} — ${i + 1}/${project.photos.length}`
  }, 0);
});

galleryGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.rk-gallery-item');
  if(!btn) return;
  openLightbox({
    photos: galleryImages,
    caption: (i) => `${i + 1}/${galleryImages.length}`
  }, Number(btn.dataset.gallery));
});

// Contact form — reuses the same booking endpoint as the Book a Shoot page
const contactForm = document.getElementById('rkContactForm');
const contactNote = document.getElementById('rkFormNote');
const contactSubmit = contactForm.querySelector('.rk-pill');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get('name').trim();
  const email = data.get('email').trim();

  if(!name || !email){
    contactNote.textContent = RokoI18n.t('errFillFields');
    contactNote.classList.add('error');
    return;
  }

  contactNote.classList.remove('error');
  contactSubmit.disabled = true;

  fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name, email,
      company: data.get('company'),
      message: data.get('message')
    })
  })
    .then((res) => {
      if(!res.ok) throw new Error('Request failed');
      contactNote.classList.remove('error');
      contactNote.textContent = RokoI18n.t('bookingSentNote');
      contactForm.reset();
    })
    .catch(() => {
      contactNote.textContent = RokoI18n.t('errSendFailed');
      contactNote.classList.add('error');
    })
    .finally(() => {
      contactSubmit.disabled = false;
    });
});

// Re-render dynamically-built content whenever the language changes
document.addEventListener('rokoshots:langchange', () => {
  renderClientCloud();
  renderWorkGrid();
  if(activeSet) updateLightbox();
  splitAboutTeaserWords();
});
