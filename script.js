/* Text for cards in EN */
const projectsEN = [
  {
    title: 'Edge-OCR Microservice',
    desc: 'Browser-run OCR powered by Tesseract-WASM — privacy-first, no server round-trip.',
    href: 'web-OCR/index.html',
    img: 'web-OCR/static/image/DALL·E-logo.webp',
    alt: 'Edge OCR',
    label: 'View Code',
  },
  {
    title: 'Pi5 AI Object-Detection App',
    desc: 'Real-time object detection on an edge device served via FastAPI.',
    href: 'https://github.com/PiWebswiss/raspberry_PI5_hailo_web_app',
    img: 'images/ai-kit.webp',
    alt: 'Pi AI',
    label: 'View Code',
  },
  {
    title: 'Colab Guide to Compile a Hailo Model',
    desc: 'Step-by-step guide to make your custom YOLO model compatible with the Hailo AI chip.',
    href: 'https://drive.google.com/file/d/14KJ9gjgsY45bcO4u3Kfz8vbZCTnk20CO/view?usp=sharing',
    img: 'images/colab_image.webp',
    alt: 'Colab Guide',
    label: 'View Guide'
  },
  {
    title: 'Fossil Image Classifier',
    desc: 'CNN that tags fossil fragments from excavation photos to speed up cataloguing.',
    href: 'fossil-classifier/index.html',
    img: 'image/AI fossil.webp',
    alt: 'Fossil Classifier',
    label: 'View Code',
  },
];

/* Text for cards in FR */
const projectsFR = [
    {
    title: 'Application de détection d’objets Pi5 AI',
    desc: 'Détection d’objets en temps réel sur un périphérique Edge, servie par FastAPI.',
    href: 'https://github.com/PiWebswiss/raspberry_PI5_hailo_web_app',
    img: 'images/ai-kit.webp',
    alt: 'Pi AI',
    label: 'Voir le code',
  },
  {
    title: 'Guide Colab pour compiler un modèle Hailo',
    desc: 'Guide étape par étape pour rendre votre modèle YOLO personnalisé compatible avec la puce Hailo AI.',
    href: 'https://colab.research.google.com/drive/1cI-a5BHdVLQiYJJdzprg2WqeuU2pA_YQ?usp=sharing',
    img: 'images/colab_image.webp',
    alt: 'Guide Colab',
    label: 'Voir le guide'
  },
  {
    title: 'Micro-service OCR Edge',
    desc: 'OCR côté navigateur grâce à Tesseract-WASM — respect de la vie privée.',
    href: 'web-OCR/index.html',
    img: 'web-OCR/static/image/DALL·E-logo.webp',
    alt: 'Edge OCR',
    label: 'Voir le code',
  },
  {
    title: 'Classificateur d’images de fossiles',
    desc: 'CNN pour taguer des fragments de fossiles et accélérer le catalogage.',
    href: 'fossil-classifier/index.html',
    img: 'images/AI fossil.webp',
    alt: 'Classificateur de fossiles',
    label: 'Voir le code',
  },
];

/* i18n dictionary (website text for EN/FR) */
const t = {
  en: {
    navProjects: 'Projects',
    navAbout: 'About',
    navContact: 'Contact',
    heroLine1: 'Passionate about',
    heroLine2: 'a Digital World',
    heroLine3: 'with AI',
    explore: 'Explore my Work',
    portfolioLabel: 'Portfolio website',
    selectedProjects: 'Selected Projects',
    aboutHeading: 'I’m',
    aboutP1: 'Swiss IT student pursuing a CFC in IT, with a Harvard CS50x certificate and an EPFL certificate in Data Science & ML.',
    aboutP2: 'Off-script you’ll find me inline-skating around Lausanne or prototyping my next side-project.',
    contactHeading: 'Get in touch',
    footerNote: 'Built in Switzerland',
    langBtn: 'FR',
  },
  fr: {
    navProjects: 'Projets',
    navAbout: 'À propos',
    navContact: 'Contact',
    heroLine1: 'Passionné par',
    heroLine2: 'un monde numérique',
    heroLine3: 'avec l’IA',
    explore: 'Découvrir mon travail',
    portfolioLabel: 'Site portfolio',
    selectedProjects: 'Projets sélectionnés',
    aboutHeading: 'Je suis',
    aboutP1: 'Étudiant suisse en informatique CFC, titulaire d’un certificat Harvard CS50x et d’un certificat EPFL en science des données et ML.',
    aboutP2: 'Hors écrans, on me trouve en roller autour de Lausanne ou en train de prototyper un nouveau projet.',
    contactHeading: 'Contactez-moi',
    footerNote: 'Réalisé en Suisse',
    langBtn: 'EN',
  },
};

/* Helper function: vanilla JSX-ish element creator */
function h(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k.startsWith('on')) {
      el.addEventListener(k.slice(2).toLowerCase(), v);
    } else if (v !== null) {
      el.setAttribute(k, v);
    }
  }
  (Array.isArray(children) ? children : [children]).forEach(c => {
    if (c != null) el.append(c.nodeType ? c : document.createTextNode(c));
  });
  return el;
}

/* Renders the project cards for the chosen language */
function renderProjects(lang) {
  const data = lang === 'fr' ? projectsFR : projectsEN;
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';
  data.forEach(p => {
    grid.append(
      h('article',
        { class: 'group tilt relative rounded-3xl overflow-hidden bg-white/5 p-6 backdrop-blur-lg border border-white/10 shadow-[0_6px_15px_rgba(0,0,0,0.3)]' },
        [
          h('a',
            { href: p.href, rel: 'noopener', class: 'block -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-3xl' },
            h('img',
              { src: p.img, alt: p.alt,
                class: 'h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105' })),
          h('h3', { class: 'text-lg font-semibold mb-2' }, p.title),
          h('p', { class: 'text-sm text-slate-400 mb-4' }, p.desc),
          h('a',
            { href: p.href, rel: 'noopener', class: 'inline-flex items-center gap-2 text-neon-1 hover:text-neon-2' },
            [ p.label, h('i', { class: 'fas fa-arrow-up-right-from-square text-xs' }) ]),
        ]));
  });
  VanillaTilt.init(document.querySelectorAll('.tilt'), {
    max: 8, speed: 400, glare: true, 'max-glare': 0.2,
  });
}

/* Updates the text of the UI according to the selected language */
function applyTranslations(lang) {
  const dict = t[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.getElementById('projectsHeading').textContent =
    dict.selectedProjects;
  document.getElementById('langToggle').textContent = dict.langBtn;
  renderProjects(lang);
}

/* Bootstraps the hero mesh animation using Three.js */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60,
                window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 55;
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('meshCanvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
const geo = new THREE.IcosahedronGeometry(20, 1);
const mat = new THREE.MeshBasicMaterial({
  color: 0x00e0ff, wireframe: true, transparent: true, opacity: 0.15 });
scene.add(new THREE.Mesh(geo, mat));
(function anim () {
  requestAnimationFrame(anim);
  scene.children[0].rotation.x += 0.002;
  scene.children[0].rotation.y += 0.003;
  renderer.render(scene, camera);
})();
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* Footer: set current year dynamically */
document.getElementById('year').textContent =
  new Date().getFullYear();

/* Hamburger mobile menu toggle */
const hb = document.getElementById('hamburger'),
      mm = document.getElementById('mobileMenu');
hb.addEventListener('click', () =>
  mm.classList.toggle('translate-x-full'));
mm.addEventListener('click', e => {
  if (e.target.tagName === 'A')
    mm.classList.add('translate-x-full');
});

/* Language initialization and toggle */
let lang = localStorage.getItem('lang') || 'en';
applyTranslations(lang);
document.getElementById('langToggle')
  .addEventListener('click', () => {
    lang = lang === 'en' ? 'fr' : 'en';
    localStorage.setItem('lang', lang);
    applyTranslations(lang);
  });
