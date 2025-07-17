/* ----------  LANGUAGE DATA ---------- */
const i18n = {
  en: {
    nav: { projects: 'Projects', about: 'About', contact: 'Contact' },
    hero: {
      head1: 'Driven to Grow',
      head2: 'in a Digital World',
      head3: 'with a focus on AI',
      cta:   'Explore my Work'
    },
    projectsTitle : 'Selected Projects',
    aboutTitle    : 'I’m',
    aboutP1       : 'Swiss IT student pursuing a CFC in IT, with a Harvard CS50x certificate in Introduction to Computer Science and an EPFL certificate in Applied Data Science and Machine Learning.',
    aboutP2       : 'Off-script, you’ll find me inline-skating around Lausanne or prototyping my next side project.',
    contactTitle  : 'Get in touch',
    footer        : 'Built in Switzerland'
  },
  fr: {
    nav: { projects: 'Projets', about: 'À propos', contact: 'Contact' },
    hero: {
      head1: 'Porté·e par la croissance',
      head2: 'dans un monde numérique',
      head3: 'avec un focus IA',
      cta:   'Voir mes travaux'
    },
    projectsTitle : 'Projets sélectionnés',
    aboutTitle    : 'Je suis',
    aboutP1       : 'Étudiant·e suisse en informatique (CFC) avec un certificat Harvard CS50x et un certificat EPFL en Data Science & ML.',
    aboutP2       : 'Hors clavier : roller autour de Lausanne ou prototypage de mon prochain side-project.',
    contactTitle  : 'Prenez contact',
    footer        : 'Créé en Suisse'
  }
};
let lang = localStorage.getItem('lang') || 'en';

/* ----------  DATA FOR LOOPED SECTIONS ---------- */
const navKeys    = ['projects','about','contact'];
const heroKeys   = ['head1','head2','head3'];
const cardsData  = [
  {
    title: 'Pi5 AI Object-Detection App',
    desc:  'Real-time object detection on an edge device, served via a FastAPI server.',
    href:  'https://github.com/PiWebswiss/raspberry_PI5_hailo_web_app',
    img:   'ai-kit.jpg',
    alt:   'Pi AI',
    label: 'View Code'
  },
  {
    title: 'Colab Guide to Compile a Hailo Model',
    desc:  'Step-by-step guide to make your custom YOLO model compatible with the Hailo AI chip.',
    href:  'https://drive.google.com/file/d/14KJ9gjgsY45bcO4u3Kfz8vbZCTnk20CO/view?usp=sharing',
    img:   'colab_image.png',
    alt:   'Colab Guide',
    label: 'View Guide'
  },
  {
    title: 'Fossil Image Classifier',
    desc:  'CNN-based system to tag fossil fragments from excavation images and speed up cataloguing.',
    href:  'fossil-classifier/index.html',
    img:   'image/AI fossil.webp',
    alt:   'Fossil Classifier',
    label: 'View Code'
  },
  {
    title: 'Edge-OCR Microservice',
    desc:  'Browser-based OCR using Tesseract-WASM — privacy-first, no server round-trips.',
    href:  'web-OCR/index.html',
    img:   'web-OCR/static/image/DALL·E-logo.webp',
    alt:   'Edge OCR',
    label: 'View Code'
  }
];
const contactsData = [
  { icon:'fas fa-envelope', href:'mailto:pi.web@piweb.ch',   text:'pi.web@piweb.ch' },
  { icon:'fab fa-github',  href:'https://github.com/PiWebswiss', text:'github.com/PiWebswiss' },
  { icon:'fab fa-linkedin-in', href:'https://linkedin.com/in/pilink', text:'linkedin.com/in/pilink' }
];

/* ----------  DOM HELPER ---------- */
const h = (tag, attrs = {}, children = []) => {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) =>
    k.startsWith('on')
      ? el.addEventListener(k.slice(2).toLowerCase(), v)
      : el.setAttribute(k, v)
  );
  (Array.isArray(children) ? children : [children]).forEach(c => {
    if (c != null) el.append(c.nodeType ? c : document.createTextNode(c));
  });
  return el;
};

/* ----------  TRANSLATION FUNCTION ---------- */
function translate() {
  // all [data-i18n] nodes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const path = el.dataset.i18n.split('.');
    let txt = i18n[lang];
    path.forEach(key => txt = txt[key]);
    el.textContent = txt;
  });
  // show next‐lang on the button
  document.getElementById('langBtn').textContent = lang === 'en' ? 'FR' : 'EN';
}

/* ----------  PAGE BUILD ---------- */
document.body.append(

  /* HEADER */
  h('header',{class:'fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-backdrop/70 border-b border-white/10'},
    h('div',{class:'relative max-w-7xl mx-auto flex items-center justify-between h-14 px-4'},[
      // Logo
      h('a',{href:'#home',class:'flex items-center'},[
        h('img',{src:'new_logo.svg',alt:'Logo',class:'h-8 w-auto'}),
        h('span',{class:'sr-only'},'Home')
      ]),
      // Desktop nav
      h('nav',{class:'hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-8 text-sm font-medium'},
        navKeys.map(id =>
          h('a',{
            href:'#'+id,
            'data-i18n':`nav.${id}`,
            class:'hover:text-neon-1'
          }, i18n[lang].nav[id])
        )
      ),
      // Right icons
      h('div',{class:'flex items-center gap-4'},[
        h('button',{
          id:'langBtn',
          class:'text-sm px-3 py-1 border rounded hover:text-neon-3',
          'aria-label':'Change language',
          onclick:()=>{
            lang = lang==='en'?'fr':'en';
            localStorage.setItem('lang',lang);
            translate();
          }
        }, lang.toUpperCase()),
        h('button',{id:'themeToggle',class:'text-xl hover:text-neon-1','aria-label':'Toggle theme'},
          h('i',{class:'fas fa-moon'})),
        h('button',{id:'hamburger',class:'md:hidden text-xl hover:text-neon-2','aria-label':'Open menu'},
          h('i',{class:'fas fa-bars'}))
      ])
    ])
  ),

  /* MOBILE MENU */
  h('nav',{id:'mobileMenu',class:'fixed inset-0 bg-backdrop flex flex-col items-center justify-center gap-10 text-lg transform translate-x-full transition-transform md:hidden'},
    navKeys.map(id =>
      h('a',{href:'#'+id,'data-i18n':`nav.${id}`,class:'hover:text-neon-1'}, i18n[lang].nav[id])
    )
  ),

  /* HERO */
  h('section',{id:'home',class:'relative flex items-center justify-center min-h-screen text-center px-4 pt-14 overflow-hidden'},[
    h('canvas',{id:'meshCanvas'}),
    h('div',{class:'max-w-3xl mx-auto relative z-10'},[
      h('h1',{class:'text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight'},
        // loop hero lines + <br>
        heroKeys.flatMap((key,i) => [
          h('span',{
            class:'bg-gradient-to-r from-neon-1 via-neon-2 to-neon-3 bg-clip-text text-transparent',
            'data-i18n':`hero.${key}`
          }, i18n[lang].hero[key]),
          i < heroKeys.length - 1 ? h('br') : null
        ])
      ),
      h('p',{class:'mt-6 text-lg text-slate-300'},[
        h('span',{class:'font-semibold'},'NAME'),' - Portfolio Website'
      ]),
      h('a',{
        href:'#projects',
        class:'mt-10 inline-flex items-center gap-3 px-8 py-3 rounded-full bg-neon-1 text-backdrop font-semibold shadow-lg hover:scale-105 transition-transform'
      },[
        h('span',{ 'data-i18n':'hero.cta' }, i18n[lang].hero.cta),
        h('i',{class:'fas fa-arrow-down'})
      ])
    ])
  ]),

  /* PROJECTS */
  h('section',{id:'projects',class:'py-24'},[
    h('div',{class:'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'},[
      h('h2',{class:'text-4xl md:text-5xl font-bold text-center mb-12','data-i18n':'projectsTitle'},
        i18n[lang].projectsTitle
      ),
      h('div',{class:'grid gap-10 sm:grid-cols-2 lg:grid-cols-3'},
        cardsData.map(card =>
          h('article',{class:'tilt relative rounded-3xl overflow-hidden bg-white/5 p-6 backdrop-blur-lg border border-white/10 shadow-[0_6px_15px_rgba(0,0,0,0.3)]'},[
            h('a',{href:card.href,target:'_blank'},
              h('img',{src:card.img,alt:card.alt,class:'rounded-xl mb-4 h-40 w-full object-cover transition hover:opacity-80'})
            ),
            h('h3',{class:'text-lg font-semibold mb-2'},card.title),
            h('p',{class:'text-sm text-slate-400 mb-4'},card.desc),
            h('a',{href:card.href,target:'_blank',class:'inline-flex items-center gap-2 text-neon-1 hover:text-neon-2'},[
              card.label, h('i',{class:'fas fa-arrow-up-right-from-square text-xs'})
            ])
          ])
        )
      )
    ])
  ]),

  /* ABOUT */
  h('section',{id:'about',class:'py-24 bg-backdrop/50'},[
    h('div',{class:'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center'},[
      h('img',{src:'image EPFL Extension School.jpeg',alt:'Working',class:'rounded-3xl shadow-lg tilt'}),
      h('div',{},[
        h('h2',{class:'text-4xl font-bold mb-6 bg-gradient-to-r from-neon-1 via-neon-2 to-neon-3 bg-clip-text text-transparent','data-i18n':'aboutTitle'},
          i18n[lang].aboutTitle
        ),
        h('p',{class:'text-slate-300 mb-4','data-i18n':'aboutP1'},i18n[lang].aboutP1),
        h('p',{class:'text-slate-300','data-i18n':'aboutP2'},i18n[lang].aboutP2)
      ])
    ])
  ]),

  /* CONTACT */
  h('section',{id:'contact',class:'py-24 bg-backdrop/70'},[
    h('div',{class:'max-w-lg mx-auto px-4 sm:px-6 lg:px-8'},[
      h('h2',{class:'text-4xl font-bold text-center mb-12 bg-gradient-to-r from-neon-1 via-neon-2 to-neon-3 bg-clip-text text-transparent','data-i18n':'contactTitle'},
        i18n[lang].contactTitle
      ),
      h('ul',{class:'space-y-10 text-lg'},
        contactsData.map(c =>
          h('li',{class:'flex items-center gap-6'},[
            h('span',{class:'flex-shrink-0 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-2xl'},
              h('i',{class:c.icon})
            ),
            h('a',{href:c.href,target:'_blank',class:'underline hover:text-neon-1'},c.text)
          ])
        )
      )
    ])
  ]),

  /* FOOTER */
  h('footer',{class:'py-6 text-center text-slate-500 text-sm bg-backdrop border-t border-white/10'},[
    '© ', new Date().getFullYear(), ' PiWeb. ',
    h('span',{'data-i18n':'footer'},i18n[lang].footer)
  ])
);

/* ----------  THREE.JS HERO ---------- */
import('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.module.js').then(THREE=>{
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60,innerWidth/innerHeight,1,1000);
  camera.position.z = 55;
  const renderer = new THREE.WebGLRenderer({canvas:document.getElementById('meshCanvas'),alpha:true});
  renderer.setSize(innerWidth,innerHeight);
  renderer.setPixelRatio(devicePixelRatio);
  const mesh = new THREE.Mesh(
    new THREE.IcosahedronGeometry(20,1),
    new THREE.MeshBasicMaterial({color:0x00e0ff,wireframe:true,transparent:true,opacity:0.15})
  );
  scene.add(mesh);
  (function anim(){
    requestAnimationFrame(anim);
    mesh.rotation.x+=0.002; mesh.rotation.y+=0.003;
    renderer.render(scene,camera);
  })();
  addEventListener('resize',()=>{
    camera.aspect=innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth,innerHeight);
  });
});

/* ----------  VANILLA-TILT ---------- */
import('https://cdn.jsdelivr.net/npm/vanilla-tilt@1.7.2/dist/vanilla-tilt.min.js').then(({default:VT})=>{
  VT.init(document.querySelectorAll('.tilt'),{max:8,speed:400,glare:true,'max-glare':0.2});
});

/* ----------  UI HANDLERS ---------- */
const mm = document.getElementById('mobileMenu');
document.getElementById('hamburger').addEventListener('click',()=>mm.classList.toggle('translate-x-full'));
mm.addEventListener('click',e=>e.target.tagName==='A'&&mm.classList.add('translate-x-full'));
document.getElementById('themeToggle').addEventListener('click',()=>document.documentElement.classList.toggle('dark'));

translate(); // first run
