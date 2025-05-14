const html = {
    navBar: document.getElementById("navBar"),
    logoPic: document.getElementById("logoPic"),

    menuToggle: document.getElementById("menuToggle"),
    menu: document.getElementById("menuDiv"),

    toggleBtn: document.getElementById('settingsToggle'),
    dropdown: document.getElementById('settingsDropdown')
};

window.addEventListener("scroll", () => {
    if(window.scrollY > 0){
        html.navBar.classList.add("scrolledNav");
    }
    else {
        html.navBar.classList.remove("scrolledNav");
    }
});

html.menuToggle.addEventListener("click", () => {
    html.menu.classList.toggle("show");
});

html.toggleBtn.addEventListener("click", () => {
    html.dropdown.classList.toggle("show");
});

window.addEventListener("click", (e) => {
    if (!html.dropdown.contains(e.target) && !html.toggleBtn.contains(e.target)) {
      html.dropdown.classList.remove("show");
    }
  });