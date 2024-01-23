const fileNames = {
    'agnatha': 'agnatha.jpg',
    'ammonoid': 'ammonoid.jpg',
    'amphibian': 'amphibian.jpg',
    'angiosperm': 'angiosperm.jpg',
    'avialae': 'avialae.jpg',
    'belemnite': 'belemnite.jpg',
    'bivalve': 'bivalve.jpg',
    'blastoid': 'blastoid.jpg',
    'bone_fragment': 'bone fragment.jpg',
    'brachiopod': 'brachiopod.jpg',
    'bryozoan': 'bryozoan.jpg',
    'chelicerate': 'chelicerate.jpg',
    'chondrichthyes': 'chondrichthyes.jpg',
    'conodont': 'conodont.jpg',
    'coral': 'crinoid.jpg',
    'crinoid': 'crocodylomorph.jpg',
    'crocodylomorph': 'crustacean.jpg',
    'crustacean': 'echinoid.jpg',
    'echinoid': 'gastropod.jpg',
    'gastropod': 'graptolite.jpg',
    'graptolite': 'gymnosperm.jpg',
    'gymnosperm': 'image coral.jpg',
    'insect': 'image insect.jpg',
    'mammal': 'mammal teeth.jpg',
    'mammal_teeth': 'mammal.jpg',
    'marine_reptile': 'marine reptile.jpg',
    'myriapod': 'myriapod.jpg',
    'nautiloid': 'nautiloid.jpg',
    'ophiuroid': 'ophiuroid.jpg',
    'ornithischian': 'ornithischian.jpg',
    'osteichthyes': 'osteichthyes.jpg',
    'petrified_wood': 'petrified wood.jpg',
    'placoderms': 'placoderms.jpg',
    'pteridophyte': 'pteridophyte.jpg',
    'pterosaurs': 'pterosaurs.jpg',
    'reptile_teeth': 'reptile teeth.jpg',
    'sauropodomorph': 'sauropodomorph.jpg',
    'shark_teeth': 'shark teeth.jpg',
    'snake': 'snake.jpg',
    'sponge': 'sponge.jpg',
    'starfish': 'starfish.jpg',
    'stromatolite': 'stromatolite.jpg',
    'theropod': 'theropod.jpg',
    'trace_fossil': 'trace fossil.jpg',
    'trilobite': 'trilobite.jpg',
    'turtle': 'turtle.jpg',
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

