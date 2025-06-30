window.onload = function () {
  const themeToggle = document.querySelector('input[name="theme"]');
  const currentTheme = localStorage.getItem("theme");

  const darkModeStyles = `
    .dark-mode {
        background-color: rgb(18, 18, 18);
        color: rgb(200, 230, 255);
    }
    .dark-mode nav,
    .dark-mode footer {
        background-color: rgb(18, 18, 18);
        color: rgb(200, 230, 255);
    }
    .dark-mode .hero {
        background-color: rgb(240, 250, 255);
        filter: brightness(0.8);
}
    .dark-mode a {
        color: rgb(200, 230, 255);
    }
    .dark-mode .hero-content h1,
    .dark-mode .hero-content p {
        color: #444;
    }
    .dark-mode .book-btn {
        background-color: #444;
        color: #f1f1f1;
        border: 1px solid #888;
    }
    .dark-mode .book-btn:hover {
        background-color: #666;
        border-color: #aaa;
    }
    .dark-mode #cardContainer {
        background-color: rgb(18, 18, 18);
    }
    .dark-mode .service-card h2,
    .dark-mode .service-card p {
        color: rgb(200, 230, 255);
    }
    .dark-mode .service-card {
        background-color: rgb(25, 25, 25)!important;
    }
    .dark-mode .dropdown-menu {
        background-color: rgb(25, 25, 25)!important;
    }

    .dark-mode .light-img {
        display: none;
    }
    .dark-mode .dark-img {
        display: block;
    }
  `;

  const styleTag = document.createElement("style");
  styleTag.textContent = darkModeStyles;
  document.head.appendChild(styleTag);

  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) themeToggle.checked = true;
  }

  if (themeToggle) {
    themeToggle.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    });
  }
};
