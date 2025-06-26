// navbar dropdown - start
const html = {
    navBar: document.getElementById("navBar"),

    menuToggle: document.getElementById("menuToggle"),
    menu: document.getElementById("menuDiv"),

    dropdown: document.getElementById('languageDropdown'),
    toggle: document.getElementById('dropdownToggle')

};

window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        html.navBar.classList.add("scrolledNav");
    }
    else {
        html.navBar.classList.remove("scrolledNav");
    }
});

html.menuToggle.addEventListener("click", () => {
    html.menu.classList.toggle("show");
});

const menuLinks = html.dropdown.querySelectorAll('.dropdown-menu a');
const toggleImg = html.toggle.querySelector('img');

html.toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    html.dropdown.classList.toggle('open');
});

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedFlag = link.getAttribute('data-flag');

        toggleImg.src = selectedFlag;
        html.dropdown.classList.remove('open');
    });
});

document.addEventListener('click', () => {
    html.dropdown.classList.remove('open');
});
// navbar dropdown - end