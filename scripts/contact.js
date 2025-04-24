// language selector
// switching among languages in localStorage
document.addEventListener('DOMContentLoaded', function () {
    if (!localStorage.getItem('language')) {
        localStorage.setItem('language', 'German');
    }
    document.querySelectorAll('#dropdown-menu a img').forEach(option => {
        if (option.alt == localStorage.getItem('language')) {
            document.getElementById('langSelection').alt = option.alt
            document.getElementById('langSelection').src = option.src
        }
    })

    const languageOptions = document.querySelectorAll('#dropdown-menu a');
    const selectedLanguage = document.getElementById('langSelection');

    languageOptions.forEach(option => {
        option.addEventListener('click', function (event) {
            event.preventDefault();
            const flagImg = this.querySelector('img');
            selectedLanguage.src = flagImg.src;
            selectedLanguage.alt = flagImg.alt;
            localStorage.setItem('language', flagImg.alt);
            console.log(flagImg.alt);
        });
    });
});






// const content = {
//   en: {
//       title: "Welcome!",
//       message: "This is a simple language selector example."
//   },
//   es: {
//       title: "¡Bienvenido!",
//       message: "Este es un ejemplo simple de selector de idioma."
//   },
//   fr: {
//       title: "Bienvenue!",
//       message: "Ceci est un exemple simple de sélecteur de langue."
//   },
//   de: {
//       title: "Willkommen!",
//       message: "Dies ist ein einfaches Beispiel für einen Sprachwähler."
//   }
// };


