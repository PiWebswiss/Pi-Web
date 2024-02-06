const fileNames = {
    'agnatha': 'agnatha.webp',
    'ammonoid': 'ammonoid.webp',
    'amphibian': 'amphibian.webp',
    'angiosperm': 'angiosperm.webp',
    'avialae': 'avialae.webp',
    'belemnite': 'belemnite.webp',
    'bivalve': 'bivalve.webp',
    'blastoid': 'blastoid.webp',
    'bone fragment': 'bone fragment.webp',
    'brachiopod': 'brachiopod.webp',
    'bryozoan': 'bryozoan.webp',
    'chelicerate': 'chelicerate.webp',
    'chondrichthyes': 'chondrichthyes.webp',
    'conodont': 'conodont.webp',
    'coral': 'crinoid.webp',
    'crinoid': 'crocodylomorph.webp',
    'crocodylomorph': 'crustacean.webp',
    'crustacean': 'echinoid.webp',
    'echinoid': 'gastropod.webp',
    'gastropod': 'graptolite.webp',
    'graptolite': 'gymnosperm.webp',
    'gymnosperm': 'image coral.webp',
    'insect': 'image insect.webp',
    'mammal': 'mammal teeth.webp',
    'mammal teeth': 'mammal.webp',
    'marine reptile': 'marine reptile.webp',
    'myriapod': 'myriapod.webp',
    'nautiloid': 'nautiloid.webp',
    'ophiuroid': 'ophiuroid.webp',
    'ornithischian': 'ornithischian.webp',
    'osteichthyes': 'osteichthyes.webp',
    'petrified wood': 'petrified wood.webp',
    'placoderms': 'placoderms.webp',
    'pteridophyte': 'pteridophyte.webp',
    'pterosaurs': 'pterosaurs.webp',
    'reptile teeth': 'reptile teeth.webp',
    'sauropodomorph': 'sauropodomorph.webp',
    'shark teeth': 'shark teeth.webp',
    'snake': 'snake.webp',
    'sponge': 'sponge.webp',
    'starfish': 'starfish.webp',
    'stromatolite': 'stromatolite.webp',
    'theropod': 'theropod.webp',
    'trace fossil': 'trace fossil.webp',
    'trilobite': 'trilobite.webp',
    'turtle': 'turtle.webp',
}

// Select the container where the images will be added
const imageGrid = document.getElementById('myImageGrid');



const dicLength = Object.keys(fileNames).length;

let imageContainer, paragraph, img; 
for (let key in fileNames) {
    imageContainer = document.createElement("div");
    paragraph = document.createElement("p");
    img = document.createElement("img");


    imageContainer.className = "image-container";
    paragraph.className = "image-name";
    paragraph.innerHTML = `${key}`;
    img.src = `public/fossil image/${fileNames[key]}`
    img.alt = fileNames[key];

    imageContainer.appendChild(paragraph);
    imageContainer.appendChild(img);

    
    imageGrid.appendChild(imageContainer);

}

