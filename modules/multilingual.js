// Changing language od screen-text
function changeOnscreenText(dbContent, newLanguage) {
    const allPageTexts = document.getElementsByClassName("onscreenText")
    for (pageText of allPageTexts) {
        for (dbText of dbContent) {
            if (pageText.classList.contains(dbText.id)) {
                pageText.innerText = dbText[newLanguage]
            }
        }
    }
}
// Reading from DB - start
function readContent(selectedLanguageText) {
    async function readAllContent(url, callback) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            callback(data, selectedLanguageText);
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Fetch error:', error);
        }
    };
    function toDoWithResult(result, selectedLanguageText) {
        if (selectedLanguageText === "English") {
            changeOnscreenText(result, "english")
        } else if (selectedLanguageText === "Macedonian") {
            changeOnscreenText(result, "macedonian")
        } else {
            changeOnscreenText(result, "german")
        }
    };
    readAllContent("http://localhost:3000/api/content", toDoWithResult);
}
// language selector
document.addEventListener('DOMContentLoaded', function () {
    // settng language as localStorage language value
    if (!localStorage.getItem('language')) {
        localStorage.setItem('language', 'German');
    }
    document.querySelectorAll('#dropdownLanguageSelector-menu a img').forEach(option => {
        if (option.alt === localStorage.getItem('language')) {
            document.getElementById('langSelection').alt = option.alt
            document.getElementById('langSelection').src = option.src
        }
    })
    readContent(localStorage.getItem('language'))
    // changing language on click
    const selectedLanguage = document.getElementById('langSelection');
    const languagesMenu = document.getElementById('dropdownLanguageSelector-menu');
    const languageOptions = document.querySelectorAll('#dropdownLanguageSelector-menu a');

    selectedLanguage.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (languagesMenu.style.display === 'block') {
            languagesMenu.style.display = 'none';
        } else {
            languagesMenu.style.display = 'block';
        }
    })
    document.addEventListener('click', function () {
        if (languagesMenu.style.display === 'block')  {
            languagesMenu.style.display = 'none';
        }
    });
    
    languageOptions.forEach(option => {
        option.addEventListener('click', function (event) {
            event.preventDefault();
            const flagImg = this.querySelector('img');
            selectedLanguage.src = flagImg.src;
            selectedLanguage.alt = flagImg.alt;
            localStorage.setItem('language', flagImg.alt);
            const selectedLanguageText = localStorage.getItem('language');

            languagesMenu.style.display = 'none';

            readContent(selectedLanguageText)
        });
    });
});









