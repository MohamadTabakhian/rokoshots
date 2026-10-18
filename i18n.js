// Site-wide translations (En/Hu) — shared by every page.
// Language choice persists in localStorage so it carries across navigation.
const translations = {
  en: {
    navClients: 'Clients',
    navGallery: 'About',
    headerCta: 'Book a Shoot',
    ariaToggleTheme: 'Toggle light and dark theme',
    ariaOpenMenu: 'Open menu',
    footerContactLabel: 'Contact Me',
    footerContactAlt: 'Contact RokoShots',
    footerReserveBtn: 'Reserve a Shoot',
    footerInstagramLabel: 'Instagram',
    footerInstagramAlt: 'RokoShots on Instagram',

    titleHome: 'RokoShots',
    heroTagline: 'Crafting visuals that turn attention into business wins.',
    clientsMarqueeAriaLabel: "Clients we've worked with",
    seeAllClientsLabel: 'See All Clients',
    featuredProjectsTitle: 'Featured Projects',
    ariaPrevProjects: 'Previous projects',
    ariaNextProjects: 'Next projects',
    ariaLightboxClose: 'Close',
    ariaLightboxPrev: 'Previous photo',
    ariaLightboxNext: 'Next photo',
    viewProjectBtn: 'View Project',
    project_restaurant: 'Restaurant',
    project_hotel: 'Hotel',
    project_bar: 'Bar',
    project_cafe: 'Cafe',

    titleAbout: 'About Robin — RokoShots',
    aboutP1: 'Hi, I’m Robin, a 26-year-old entrepreneur, photographer and filmmaker.',
    aboutP2: 'For nearly eight years, I have been building my business with the goal of helping premium hotels, restaurants, and brands in the hospitality and tourism sectors grow through strategic visual communication.',
    aboutP3: 'To me, photography and video are simply tools. Their true value lies not in the volume of content produced, but in the impact they create: greater visibility, a stronger brand presence, more enquiries and, ultimately, increased revenue.',
    aboutP4: 'That is why every collaboration begins with understanding your business, your guests and your commercial objectives. We do not simply create beautiful photographs and striking videos. We produce purposeful visual content that authentically communicates the value of your brand, differentiates you from your competitors and genuinely supports your growth.',
    aboutP5: 'My goal is for our work together to be more than just an expense—it should be a long-term investment. We create content that can be used effectively across multiple platforms and campaigns, delivering tangible, measurable impact.',
    aboutP6: 'I personally lead every project, both strategically and creatively, supported by a close-knit team throughout the production process. This ensures that the entire experience remains clear, seamless and consistent.',
    aboutP7: 'Whether you already have a clear concept or simply know the business outcome you want to achieve, feel free to get in touch. I will guide you through the entire process, from planning to execution, while my team and I ensure that the final result reflects the quality of your brand and genuinely supports your goals.',

    titleClients: 'Clients — RokoShots',
    clientsHeading: 'Clients',
    ariaPrevPage: 'Previous page',
    ariaNextPage: 'Next page',
    clCloseBtn: '[ X ] Close',

    titleBooking: 'Book a Shoot — RokoShots',
    bookingPageHeading: 'Book a Shoot',
    reserveYourTime: 'Reserve Your Time',
    bookingSub: "Answer a few questions and pick a slot — we'll email your reservation request straight to our team.",
    labelFullName: 'Full Name',
    labelCompany: 'Company',
    labelEmail: 'Email',
    labelPhone: 'Phone',
    labelProjectType: 'Project Type',
    labelShootLocation: 'Shoot Location',
    placeholderLocation: 'City / venue',
    labelShootDuration: 'Shoot Duration',
    labelTellUs: 'Tell us about the shoot',
    placeholderMessage: 'What are we shooting, how many dishes/rooms/spaces, any deadlines...',
    optRestaurant: 'Restaurant',
    optHotel: 'Hotel',
    optCafe: 'Café',
    optTourism: 'Tourism / Travel Brand',
    optOther: 'Other',
    durationOpt1: '1 hour',
    durationOpt2: '2 hours',
    durationOptHalf: 'Half day (4 hours)',
    durationOptFull: 'Full day (8 hours)',
    reserveMySlotBtn: 'Reserve My Slot',
    errFillFields: 'Please fill in your name and email.',
    errSendFailed: "Something went wrong sending your request — please try again or email us directly.",
    bookingSentNote: "Thanks! Your request has been emailed to us — we'll get back to you shortly.",

    navWork: 'Work',
    homeEyebrow: 'Photo & Film for Luxury Hotels and Restaurants',
    homeTitleLine1: 'Make your hotel look as good online',
    homeTitleLine2: 'as it feels in person.',
    homeSubtitle: 'Cinematic photos and reels for premium hotels, restaurants and bars, so guests feel the place before they arrive.',
    btnBookCall: 'Book a Shoot',
    btnSeeWork: 'See the Work',
    clientsEyebrow: 'Clients',
    clientsTrustedHeading: 'Trusted by hotels, restaurants and brands',
    michelinStarBadge: 'Michelin Star',
    workTitle: 'Selected work',
    workCategoryHotel: 'Hotel',
    workCategoryRestaurant: 'Restaurant',
    workCategoryBrand: 'Brand',
    workCategoryBar: 'Bar',
    testimonialsEyebrow: 'What Clients Say',
    aboutTeaserEyebrow: 'About',
    aboutTeaserNormal: "I'm Robin Kovács. For almost eight years I've helped hotels and restaurants grow through visuals.",
    aboutTeaserItalic: 'Every project starts with your guests, and I lead each one myself.',
    aboutReadMore: 'Read More',
    contactHeadingNormal: 'Tell me about',
    contactHeadingItalic: 'your hotel.',
    formLabelName: 'Name',
    formLabelCompany: 'Hotel or Restaurant',
    formLabelEmail: 'Email',
    formLabelMessage: 'Message',
    formSubmitBtn: 'Book a Shoot',
    footerCopyright: '© 2026 RokoShots · Budapest',
    instagramEyebrow: 'Instagram',
    igFollowBtn: 'Follow',
    ariaPrevPost: 'Previous post',
    ariaNextPost: 'Next post'
  },
  hu: {
    navClients: 'Ügyfelek',
    navGallery: 'Rólam',
    headerCta: 'Foglalj fotózást',
    ariaToggleTheme: 'Világos és sötét téma váltása',
    ariaOpenMenu: 'Menü megnyitása',
    footerContactLabel: 'Kapcsolat',
    footerContactAlt: 'Kapcsolatfelvétel a RokoShots-tal',
    footerReserveBtn: 'Foglalj fotózást',
    footerInstagramLabel: 'Instagram',
    footerInstagramAlt: 'RokoShots Instagram oldala',

    titleHome: 'RokoShots',
    heroTagline: 'Olyan vizuális tartalmakat készítek, amelyek a figyelmet üzleti sikerré alakítják.',
    clientsMarqueeAriaLabel: 'Ügyfelek, akikkel dolgoztunk',
    seeAllClientsLabel: 'Összes ügyfél megtekintése',
    featuredProjectsTitle: 'Kiemelt projektek',
    ariaPrevProjects: 'Előző projektek',
    ariaNextProjects: 'Következő projektek',
    ariaLightboxClose: 'Bezárás',
    ariaLightboxPrev: 'Előző fotó',
    ariaLightboxNext: 'Következő fotó',
    viewProjectBtn: 'Projekt megtekintése',
    project_restaurant: 'Étterem',
    project_hotel: 'Hotel',
    project_bar: 'Bár',
    project_cafe: 'Kávézó',

    titleAbout: 'Robinról — RokoShots',
    aboutP1: 'Szia, Robin vagyok, 26 éves vállalkozó, fotós és filmkészítő.',
    aboutP2: 'Közel nyolc éve építem a vállalkozásomat azzal a céllal, hogy stratégiai vizuális kommunikáción keresztül segítsem a prémium hotelek, éttermek és a vendéglátó- és turisztikai szektor márkáinak növekedését.',
    aboutP3: 'Számomra a fotózás és a videó egyszerűen eszközök. Valódi értékük nem a legyártott tartalom mennyiségében rejlik, hanem abban a hatásban, amit elérnek: nagyobb láthatóság, erősebb márkajelenlét, több érdeklődő és végső soron növekvő bevétel.',
    aboutP4: 'Ezért minden együttműködés a vállalkozásod, a vendégeid és az üzleti céljaid megértésével kezdődik. Nem egyszerűen szép fotókat és látványos videókat készítünk. Célirányos vizuális tartalmat hozunk létre, amely hitelesen közvetíti a márkád értékét, megkülönböztet a versenytársaktól, és valódi módon támogatja a növekedésedet.',
    aboutP5: 'A célom, hogy a közös munkánk ne csupán egy kiadás legyen, hanem hosszú távú befektetés. Olyan tartalmakat készítünk, amelyek több platformon és kampányban is hatékonyan felhasználhatók, kézzelfogható és mérhető eredményt hozva.',
    aboutP6: 'Minden projektet személyesen vezetek, mind stratégiai, mind kreatív szempontból, egy összeszokott csapat támogatásával a teljes gyártási folyamat során. Ez biztosítja, hogy az egész folyamat átlátható, zökkenőmentes és következetes maradjon.',
    aboutP7: 'Legyen szó akár egy már kész elképzelésről, akár csak arról, hogy milyen üzleti eredményt szeretnél elérni, bátran vedd fel velem a kapcsolatot. Végigkísérlek a teljes folyamaton a tervezéstől a megvalósításig, miközben csapatommal biztosítjuk, hogy a végeredmény tükrözze márkád minőségét, és valóban támogassa a céljaidat.',

    titleClients: 'Ügyfelek — RokoShots',
    clientsHeading: 'Ügyfelek',
    ariaPrevPage: 'Előző oldal',
    ariaNextPage: 'Következő oldal',
    clCloseBtn: '[ X ] Bezárás',

    titleBooking: 'Foglalj fotózást — RokoShots',
    bookingPageHeading: 'Foglalj fotózást',
    reserveYourTime: 'Foglald le az időpontod',
    bookingSub: 'Válaszolj néhány kérdésre, és válassz egy időpontot — a foglalási kérésedet elküldjük e-mailben a csapatunknak.',
    labelFullName: 'Teljes név',
    labelCompany: 'Cég',
    labelEmail: 'E-mail',
    labelPhone: 'Telefonszám',
    labelProjectType: 'Projekt típusa',
    labelShootLocation: 'Helyszín',
    placeholderLocation: 'Város / helyszín',
    labelShootDuration: 'Fotózás időtartama',
    labelTellUs: 'Mesélj a fotózásról',
    placeholderMessage: 'Mit fotózunk, hány fogás/szoba/tér, van-e határidő...',
    optRestaurant: 'Étterem',
    optHotel: 'Hotel',
    optCafe: 'Kávézó',
    optTourism: 'Turisztikai / utazási márka',
    optOther: 'Egyéb',
    durationOpt1: '1 óra',
    durationOpt2: '2 óra',
    durationOptHalf: 'Fél nap (4 óra)',
    durationOptFull: 'Egész nap (8 óra)',
    reserveMySlotBtn: 'Időpont lefoglalása',
    errFillFields: 'Kérjük, add meg a neved és e-mail címed.',
    errSendFailed: 'Hiba történt a kérésed elküldésekor — próbáld újra, vagy írj nekünk e-mailt közvetlenül.',
    bookingSentNote: 'Köszönjük! A kérésedet elküldtük e-mailben — hamarosan jelentkezünk.',

    navWork: 'Munkáim',
    homeEyebrow: 'Fotó és film prémium hoteleknek és éttermeknek',
    homeTitleLine1: 'Tedd a hoteled online is olyan jóvá,',
    homeTitleLine2: 'amilyennek személyesen érződik.',
    homeSubtitle: 'Letisztult fotók és reelek prémium hoteleknek, éttermeknek és bároknak, hogy a vendégek már érkezés előtt érezzék a hangulatot.',
    btnBookCall: 'Foglalj fotózást',
    btnSeeWork: 'Nézd a Munkáimat',
    clientsEyebrow: 'Ügyfelek',
    clientsTrustedHeading: 'Hotelek, éttermek és márkák bizalma',
    michelinStarBadge: 'Michelin Csillagos',
    workTitle: 'Válogatott munkák',
    workCategoryHotel: 'Hotel',
    workCategoryRestaurant: 'Étterem',
    workCategoryBrand: 'Márka',
    workCategoryBar: 'Bár',
    testimonialsEyebrow: 'Ügyfeleink mondták',
    aboutTeaserEyebrow: 'Rólam',
    aboutTeaserNormal: 'Kovács Robin vagyok. Közel nyolc éve segítek hoteleknek és éttermeknek vizuális tartalmakkal növekedni.',
    aboutTeaserItalic: 'Minden projekt a vendégeiddel kezdődik, és mindegyiket személyesen vezetem.',
    aboutReadMore: 'Tovább',
    contactHeadingNormal: 'Mesélj',
    contactHeadingItalic: 'a hoteledről.',
    formLabelName: 'Név',
    formLabelCompany: 'Hotel vagy Étterem',
    formLabelEmail: 'Email',
    formLabelMessage: 'Üzenet',
    formSubmitBtn: 'Foglalj fotózást',
    footerCopyright: '© 2026 RokoShots · Budapest',
    instagramEyebrow: 'Instagram',
    igFollowBtn: 'Követés',
    ariaPrevPost: 'Előző bejegyzés',
    ariaNextPost: 'Következő bejegyzés'
  }
};

function getLang(){
  return localStorage.getItem('rokoshots-lang') || 'en';
}

function t(key){
  const lang = getLang();
  const dict = translations[lang] || translations.en;
  return dict[key] !== undefined ? dict[key] : translations.en[key];
}

function applyStaticTranslations(lang){
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = translations[lang][el.getAttribute('data-i18n')];
    if(val !== undefined) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const val = translations[lang][el.getAttribute('data-i18n-placeholder')];
    if(val !== undefined) el.placeholder = val;
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const val = translations[lang][el.getAttribute('data-i18n-aria-label')];
    if(val !== undefined) el.setAttribute('aria-label', val);
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const val = translations[lang][el.getAttribute('data-i18n-alt')];
    if(val !== undefined) el.setAttribute('alt', val);
  });
  document.querySelectorAll('.lang-switch button').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  const titleKey = document.documentElement.getAttribute('data-i18n-title');
  if(titleKey && translations[lang][titleKey] !== undefined){
    document.title = translations[lang][titleKey];
  }
}

function setLang(lang){
  if(lang !== 'en' && lang !== 'hu') return;
  localStorage.setItem('rokoshots-lang', lang);
  applyStaticTranslations(lang);
  document.dispatchEvent(new CustomEvent('rokoshots:langchange', { detail: { lang } }));
}

function initI18n(){
  applyStaticTranslations(getLang());
  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  initI18n();
}

window.RokoI18n = { t, getLang, setLang, translations };
