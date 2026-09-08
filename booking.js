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

// Language switcher — En/Hu (header only, for now)
const translations = {
  en: { clients: 'Clients', gallery: 'Gallery', cta: 'Book a Shoot' },
  hu: { clients: 'Ügyfelek', gallery: 'Galéria', cta: 'Foglalj fotózást' }
};
const allLangButtons = document.querySelectorAll('.lang-switch button');
const allNavClients = document.querySelectorAll(".nav-clients");
const allNavGallery = document.querySelectorAll(".nav-gallery");
const allCtaBtns = document.querySelectorAll('.header-cta');

function setLang(lang){
  allLangButtons.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  allNavClients.forEach(el => el.textContent = translations[lang].clients);
  allNavGallery.forEach(el => el.textContent = translations[lang].gallery);
  allCtaBtns.forEach(el => el.textContent = translations[lang].cta);
  document.documentElement.lang = lang;
}
allLangButtons.forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

// Left/right photo stacks — each tile picks a RANDOM photo from its pool every 10 seconds
const photoPool = [
  'col1-1.jpg', 'col1-2.jpg', 'col1-3.jpg',
  'col1-4.jpg', 'col1-5.jpg', 'col1-6.jpg',
  'col2-1.jpg', 'col2-2.jpg', 'col2-3.jpg',
  'col2-4.jpg', 'col2-5.jpg', 'col2-6.jpg',
  'furia-1.jpg', 'hotel-1.jpg',
  'cafe-1.jpg', 'coastal-1.jpg',
  'chefs-table-1.jpg', 'tourism-1.jpg'
];

function randomCycle(tileId){
  const img = document.querySelector('#' + tileId + ' img');
  setInterval(() => {
    const next = photoPool[Math.floor(Math.random() * photoPool.length)];
    img.style.animation = 'none';
    img.offsetHeight; // restart animation
    img.style.animation = '';
    img.src = next;
  }, 10000);
}
['bpLeft1', 'bpLeft2', 'bpRight1', 'bpRight2'].forEach(randomCycle);

// Reservation form — builds a pre-filled Google Calendar event and opens it
const bookingForm = document.getElementById('bookingForm');
const bookingNote = document.getElementById('bookingNote');

function pad(n){ return n < 10 ? '0' + n : String(n); }
function toGCalUTC(date){
  return date.getUTCFullYear() + pad(date.getUTCMonth() + 1) + pad(date.getUTCDate()) +
    'T' + pad(date.getUTCHours()) + pad(date.getUTCMinutes()) + '00Z';
}

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(bookingForm);
  const name = data.get('name').trim();
  const email = data.get('email').trim();
  const dateVal = data.get('date');
  const timeVal = data.get('time');

  if(!name || !email || !dateVal || !timeVal){
    bookingNote.textContent = 'Please fill in your name, email, date and time.';
    bookingNote.classList.add('error');
    return;
  }

  const durationHours = Number(data.get('duration')) || 1;
  const start = new Date(`${dateVal}T${timeVal}`);
  if(isNaN(start.getTime())){
    bookingNote.textContent = 'That date/time didn\'t look right — please check it.';
    bookingNote.classList.add('error');
    return;
  }
  const end = new Date(start.getTime() + durationHours * 3600 * 1000);

  const title = `RokoShots Shoot — ${name}`;
  const details = [
    `Project type: ${data.get('projectType')}`,
    `Company: ${data.get('company') || '—'}`,
    `Contact: ${email}${data.get('phone') ? ' / ' + data.get('phone') : ''}`,
    `Duration: ${durationHours}h`,
    `Details: ${data.get('message') || '—'}`
  ].join('\n');
  const location = data.get('location') || '';

  const url = 'https://calendar.google.com/calendar/render'
    + '?action=TEMPLATE'
    + '&text=' + encodeURIComponent(title)
    + '&dates=' + toGCalUTC(start) + '/' + toGCalUTC(end)
    + '&details=' + encodeURIComponent(details)
    + '&location=' + encodeURIComponent(location);

  fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name, email,
      phone: data.get('phone'),
      company: data.get('company'),
      projectType: data.get('projectType'),
      location,
      date: dateVal,
      time: timeVal,
      duration: durationHours,
      message: data.get('message')
    })
  }).catch(() => {}); // best-effort — calendar link still opens either way

  bookingNote.classList.remove('error');
  bookingNote.textContent = 'Opening Google Calendar — click Save there to confirm your slot.';
  window.open(url, '_blank');
});
