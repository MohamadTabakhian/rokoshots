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

// Left/right photo stacks — same rotating images as the homepage hero columns
const col1Images = ['A1.jpg', 'A2.jpg', 'A3.jpg', 'A4.jpg', 'A5.jpeg', 'A6.jpg'];
const col2Images = ['A7.jpg', 'A8.jpeg', 'A9.jpg', 'A10.jpeg', 'A11.jpeg', 'A12.jpeg'];

function startCycle(tileId, images, startIndex){
  const img = document.querySelector('#' + tileId + ' img');
  let i = startIndex;
  setInterval(() => {
    i = (i + 1) % images.length;
    img.style.animation = 'none';
    img.offsetHeight; // force reflow to restart animation
    img.style.animation = '';
    img.src = images[i];
  }, 10000);
}
startCycle('bpLeft1', col1Images, 0);
startCycle('bpLeft2', col1Images, 3);
startCycle('bpRight1', col2Images, 0);
startCycle('bpRight2', col2Images, 3);

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
    bookingNote.textContent = RokoI18n.t('errFillFields');
    bookingNote.classList.add('error');
    return;
  }

  const durationHours = Number(data.get('duration')) || 1;
  const start = new Date(`${dateVal}T${timeVal}`);
  if(isNaN(start.getTime())){
    bookingNote.textContent = RokoI18n.t('errBadDate');
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
  bookingNote.textContent = RokoI18n.t('bookingOpeningNote');
  window.open(url, '_blank');
});
