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

// Photo pool to draw from (reused/cycled — swap with real per-client photos later)
const pool = [
  'star1.jpg', 'star2.jpg', 'star3.jpg', 'star4.jpg',
  'habtoor1.JPG', 'habtoor2.JPG',
  'habtoor3.JPG', 'habtoor4.JPG', 'velvet1.jpg', 'velvet2.jpg', 'velvet3.jpg', 'velvet4.jpg',
  'avalon1.jpeg', 'avalon2.jpeg',
  'avalon3.jpeg', 'avalon4.jpeg',
  'gemini1.jpg', 'gemini2.jpg',
  'gemini3.jpg', 'gemini4.jpg',
  '42-4.JPG', '42-1.JPG',
  '42-2.JPG', '42-3.JPG',
  'pizza1.JPG','pizza2.JPG','pizza3.JPG','pizza4.JPG',
  'sky1.jpeg','sky2.jpeg','sky3.jpeg','sky4.jpeg',
  'cortez1.JPG','cortez2.JPG','cortez3.JPG','cortez4.JPG' , 
  'simons.PNG',
  'merriott1.jpeg','merriott2.jpeg','merriott3.jpeg','merriott4.jpeg','merriott5.jpeg',
  'moss1.JPG','moss2.JPG','moss3.JPG','moss4.JPG','moss5.JPG',
  'tenebris1.JPG','tenebris2.JPG','tenebris3.JPG','tenebris4.JPG','tenebris5.JPG',
  'muse1.jpg','muse2.jpg','muse3.jpg','muse4.jpg',
  'valley1.jpeg','valley2.jpeg','valley3.jpeg','valley4.jpeg','valley5.jpeg',
  'sauska1.JPG','sauska2.JPG','sauska3.JPG','sauska4.JPG',
  'yacht1.JPG','yacht2.JPG','yacht3.JPG','yacht4.JPG',
  'infinity1.jpg','infinity2.jpg','infinity3.jpg','infinity4.jpg',
  'furia1.JPG','furia2.JPG','furia3.JPG','furia4.JPG'
];
// 15 clients — replace names/photos with real ones as the roster grows
const clients = [];
const names = [
  'Starbucks', 'Al Habtoor Palace', 'Velvet Bar & Cafe', 'Avalon Hotel & Spa',
  'Gemini Bar', '42 Restaurant (Michelin star)', 'PizzaMe', 'SkyRose Bar', 'Cortez Restaurant', 'Simon’s burger',
  'Marriott Hotel ', 'The Moss','Tenebris vodka','Cafe Muse', 'Valley Budapest', 'Sauska Tokaj','Avalon Yacht', 'Infinity Hotel','Furia Restaurant'
];
// Photo counts per client, in the same order as `names` — matches how each
// client's photos are grouped consecutively in `pool` above.
const photoCounts = [4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 5, 5, 5, 4, 5, 4, 4, 4, 4];
// I Have too add other Logos
const logos = { 'Starbucks': 'starbucks-logo.svg', 'Mariott Hotel': 'marriott-logo.svg' };
let poolOffset = 0;
names.forEach((name, i) => {
  const count = photoCounts[i];
  clients.push({ name, logo: logos[name], photos: pool.slice(poolOffset, poolOffset + count) });
  poolOffset += count;
});

function rowMarkup(client, clientIndex){
  const photosHtml = client.photos.map((src, i) => `
      <button type="button" class="cp-photo" data-client="${clientIndex}" data-photo="${i}">
        <img src="${src}" alt="${client.name}">
      </button>`).join('');
  const logoHtml = client.logo
    ? `<img src="${client.logo}" alt="${client.name} logo" class="client-logo">`
    : '';

  return `
    <div class="client-row">
      <div class="client-row-header">
        <span class="client-name">${client.name}</span>
        ${logoHtml}
      </div>
      <div class="client-photos">
        ${photosHtml}
      </div>
    </div>`;
}

const clientsList = document.getElementById('clientsList');
const PAGE_SIZE = 5;
const pageCount = Math.ceil(clients.length / PAGE_SIZE);
let currentPage = 0;

const pagePrev = document.getElementById('clientsPagePrev');
const pageNext = document.getElementById('clientsPageNext');
const pageCountLabel = document.getElementById('clientsPageCount');

function renderPage(scroll){
  const start = currentPage * PAGE_SIZE;
  const pageClients = clients.slice(start, start + PAGE_SIZE);
  clientsList.innerHTML = pageClients.map((c, i) => rowMarkup(c, start + i)).join('');
  pageCountLabel.textContent = `${currentPage + 1} / ${pageCount}`;
  pagePrev.disabled = currentPage === 0;
  pageNext.disabled = currentPage === pageCount - 1;
  if(scroll) window.scrollTo({ top: clientsList.offsetTop - 100, behavior: 'smooth' });
}
pagePrev.addEventListener('click', () => {
  if(currentPage === 0) return;
  currentPage--;
  renderPage(true);
});
pageNext.addEventListener('click', () => {
  if(currentPage === pageCount - 1) return;
  currentPage++;
  renderPage(true);
});
renderPage(false);

// Lightbox — Close (left) / Company name (center) / Count (right)
const clientLightbox = document.getElementById('clientLightbox');
const clImg = document.getElementById('clImg');
const clName = document.getElementById('clName');
const clCount = document.getElementById('clCount');
const clClose = document.getElementById('clClose');
const clPrev = document.getElementById('clPrev');
const clNext = document.getElementById('clNext');

let activeClient = null;
let activePhoto = 0;

function openClientLightbox(clientIndex, photoIndex){
  activeClient = clients[clientIndex];
  activePhoto = photoIndex;
  updateClientLightbox();
  clientLightbox.classList.add('open');
}
function updateClientLightbox(){
  clImg.style.animation = 'none';
  clImg.offsetHeight; // restart animation
  clImg.style.animation = '';
  clImg.src = activeClient.photos[activePhoto];
  clName.textContent = activeClient.name;
  clCount.textContent = `${activePhoto + 1} / ${activeClient.photos.length}`;
}
function closeClientLightbox(){
  clientLightbox.classList.remove('open');
  activeClient = null;
}

clientsList.addEventListener('click', (e) => {
  const btn = e.target.closest('.cp-photo');
  if(!btn) return;
  openClientLightbox(Number(btn.dataset.client), Number(btn.dataset.photo));
});

clClose.addEventListener('click', closeClientLightbox);
clientLightbox.addEventListener('click', (e) => { if(e.target === clientLightbox) closeClientLightbox(); });
clPrev.addEventListener('click', () => {
  if(!activeClient) return;
  activePhoto = (activePhoto - 1 + activeClient.photos.length) % activeClient.photos.length;
  updateClientLightbox();
});
clNext.addEventListener('click', () => {
  if(!activeClient) return;
  activePhoto = (activePhoto + 1) % activeClient.photos.length;
  updateClientLightbox();
});
document.addEventListener('keydown', (e) => {
  if(!clientLightbox.classList.contains('open')) return;
  if(e.key === 'Escape') closeClientLightbox();
  if(e.key === 'ArrowLeft') clPrev.click();
  if(e.key === 'ArrowRight') clNext.click();
});
