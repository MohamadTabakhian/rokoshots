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

// Reservation form — sends the requested slot straight to us by email
const bookingForm = document.getElementById('bookingForm');
const bookingNote = document.getElementById('bookingNote');
const reserveBtn = bookingForm.querySelector('.reserve-btn');

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(bookingForm);
  const name = data.get('name').trim();
  const email = data.get('email').trim();
  const timeVal = data.get('time');

  if(!name || !email || !timeVal){
    bookingNote.textContent = RokoI18n.t('errFillFields');
    bookingNote.classList.add('error');
    return;
  }

  const durationHours = Number(data.get('duration')) || 1;

  bookingNote.classList.remove('error');
  reserveBtn.disabled = true;

  fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name, email,
      phone: data.get('phone'),
      company: data.get('company'),
      projectType: data.get('projectType'),
      location: data.get('location'),
      time: timeVal,
      duration: durationHours,
      message: data.get('message')
    })
  })
    .then((res) => {
      if(!res.ok) throw new Error('Request failed');
      bookingNote.classList.remove('error');
      bookingNote.textContent = RokoI18n.t('bookingSentNote');
      bookingForm.reset();
    })
    .catch(() => {
      bookingNote.textContent = RokoI18n.t('errSendFailed');
      bookingNote.classList.add('error');
    })
    .finally(() => {
      reserveBtn.disabled = false;
    });
});
