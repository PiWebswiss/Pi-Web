document.getElementById('translateToFr').addEventListener('click', function() {
  translatePage('fr');
});

document.getElementById('translateToEn').addEventListener('click', function() {
  translatePage('en');
});


const translations = {
  'en': {
    'h1': 'AI Model to classify surgical instruments',
    'h2': 'Model is in Beta',
    'h3': 'Here are surgical instruments that the model can recognise.',
    'image-name-1': 'Ciseaux Mayo',
    'image-name-2': 'Ciseaux micro',
    'image-name-3': 'Ciseaux Stevens',
    'image-name-4': 'Ciseaux Stille',
    'image-name-5': 'Ciseaux à plâtre',
    'text-model-h2': 'Try the model',
    'text-model-h3': 'Upload a surgical instrument.',
    'text-model-p1': 'Upload a surgical instrument image by choosing a file',
    'text-model-p2': 'The model runs automatically when an image is given',
    'text-model-p3': 'Upload a surgical instrument image by dragging & dropping or choose a file',
    'text-model-h4': 'The model runs automatically when an image is given',
    'text-results': "Predicted class",
    'bth-go-back': 'Go back to PIWeb',
  },
  'fr': {
    'h1': 'Modèle IA pour classer les instruments chirurgicaux',
    'h2': 'Le modèle est en version bêta',
    'h3': 'Voici les instruments chirurgicaux que le modèle peut reconnaître.',
    'image-name-1': 'Ciseaux Mayo',
    'image-name-2': 'Ciseaux micro',
    'image-name-3': 'Ciseaux Stevens',
    'image-name-4': 'Ciseaux Stille',
    'image-name-5': 'Ciseaux à plâtre',
    'text-model-h2': 'Essayez le modèle',
    'text-model-h3': 'Téléchargez un instrument chirurgical.',
    'text-model-p1': 'Téléchargez une image d\'instrument chirurgical en choisissant un fichier',
    'text-model-p2': 'Le modèle se lance automatiquement lorsqu\'une image est fournie',
    'text-model-p3': 'Téléchargez une image d\'instrument chirurgical en la glissant et la déposant ou choisissez un fichier',
    'text-model-h4': 'Le modèle se lance automatiquement lorsqu\'une image est fournie',
    'text-results': "Résultat",
    'bth-go-back': 'Retourner à PIWeb',
  }
};


  function translatePage(lang)  {
    document.querySelectorAll("[data-translate]").forEach(el => {
      el.textContent = translations[lang][el.dataset.translate];
    });
  }

