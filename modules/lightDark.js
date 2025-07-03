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
  .dark-mode .container h2,
  .dark-mode .container p {
      color: rgb(200, 230, 255);
  }
  .dark-mode .container {
  box-shadow: 0 0 10px rgb(60, 120, 200);
      background-color: rgb(25, 25, 25) !important;
  }
  .dark-mode .dropdown-menu {
      background-color: rgb(25, 25, 25) !important;
  }
  .dark-mode .light-img {
      display: none;
  }
  .dark-mode .dark-img {
      display: block;
  }
  .dark-mode #contact-form {
      background-color: rgb(25, 25, 25) !important;
      box-shadow: 0 0 10px rgb(60, 120, 200);
  }
  .dark-mode #contact-form h2 {
      color: rgb(200, 230, 255);
  }
  .dark-mode #contact-form label {
      color: rgb(180, 220, 250);
  }
  .dark-mode #contact-form input,
  .dark-mode #contact-form textarea {
      background-color: rgb(45, 45, 45);
      color: rgb(200, 230, 255);
      border: 1px solid rgb(90, 90, 90);
  }
  .dark-mode #contact-form input::placeholder,
  .dark-mode #contact-form textarea::placeholder {
      color: rgb(150, 150, 150);
  }
  .dark-mode #contact-form button {
      background-color: rgb(60, 120, 200);
      color: white;
  }
  .dark-mode .container h1,
  .dark-mode .container h2,
  .dark-mode .container p {
      color: rgb(200, 230, 255);
  }
  .dark-mode .container label {
     color: rgb(180, 220, 250);
  }
  .dark-mode .container input,
  .dark-mode .container textarea {
      background-color: rgb(45, 45, 45);
      border: 1px solid rgb(90, 90, 90);
      color: rgb(200, 230, 255);
  }
  .dark-mode .container input::placeholder,
  .dark-mode .container textarea::placeholder {
      color: rgb(150, 150, 150);
  }
  .dark-mode #review-form {
      background-color: rgb(35, 35, 35);
      box-shadow: 0 0 10px rgb(60, 120, 200);
      color: rgb(200, 230, 255);
  }
  .dark-mode #review-form h2 {
      color: rgb(200, 230, 255);
  }
  .dark-mode #review-form label {
      color: rgb(180, 220, 250);
  }
  .dark-mode #reviewForm input,
  .dark-mode #reviewForm textarea {
      background-color: rgb(45, 45, 45);
      border: 1px solid rgb(90, 90, 90);
      color: rgb(200, 230, 255);
  }
  .dark-mode #reviewForm input::placeholder,
  .dark-mode #reviewForm textarea::placeholder {
      color: rgb(150, 150, 150);
  }
  .dark-mode #reviewForm button[type="submit"] {
      background-color: rgb(60, 120, 200);
      color: white;
  }
  .dark-mode #reviewForm button[type="submit"]:hover {
      background-color: rgb(21, 64, 121);
  }
  .dark-mode .service {
      background-color: rgb(35, 35, 35);
      box-shadow: 0 0 10px rgb(60, 120, 200);
      border-color: rgb(70, 70, 70);
      color: rgb(200, 230, 255);
  }
  .dark-mode .service h3 {
      color: rgb(200, 230, 255);
  }
  .dark-mode .service-description {
      color: rgb(180, 210, 240);
  }
  .dark-mode .service:hover {
      background-color: rgb(0, 0, 0);
  }
  .dark-mode .review {
  box-shadow: 0 0 10px rgb(118, 167, 231);
      background-color: rgb(35, 35, 35);
      border-color: rgb(70, 70, 70);
      color: rgb(200, 230, 255);
  }
  .dark-mode .review-header h3 {
      color: rgb(200, 230, 255);
  }
  .dark-mode #review-createdAt {
      color: rgb(150, 150, 150);
  }
  .dark-mode #review-opinion {
      color: rgb(180, 210, 240);
  }
  .dark-mode #submitToggleNewReview {
      background-color: rgb(60, 120, 200);
  }
   .dark-mode #login-form{
    box-shadow: 0 0 10px rgb(118, 167, 231);
      background-color: rgb(35, 35, 35);
      border-color: rgb(70, 70, 70);
      color: rgb(200, 230, 255);
   }
    .dark-mode #login-form input,
    .dark-mode #login-form textarea {
      background-color: rgb(45, 45, 45);
      border: 1px solid rgb(90, 90, 90);
      color: rgb(200, 230, 255);
     }
    .dark-mode #login-form h2{
    color: rgb(200, 230, 255);
    }
    .dark-mode #login-form label{
    color: rgb(200, 230, 255);
    }
    .dark-mode #userTableWrapper,
    .dark-mode #cardTableWrapper,
    .dark-mode #signup-form-wrapper,
    .dark-mode #emailTableWrapper,
    .dark-mode #contentTableWrapper,
    .dark-mode #card-form-wrapper,
    .dark-mode #reviewTableWrapper {
     box-shadow: 0 0 10px rgb(118, 167, 231);
      background-color: rgb(35, 35, 35);
      border-color: rgb(70, 70, 70);
      color: rgb(200, 230, 255);
    }
    .dark-mode .content-entry,
    .dark-mode .user-entry,
    .dark-mode .email-entry,
    .dark-mode .review-entry,
    .dark-mode .card-entry{
    box-shadow: 0 0 10px rgb(118, 167, 231);
     background-color: rgb(35, 35, 35);
    border-color: rgb(70, 70, 70);
    }
    .dark-mode #leftVerticalMenu{
     box-shadow: 0 0 10px rgb(118, 167, 231);
     background-color: rgb(35, 35, 35);
    border-color: rgb(70, 70, 70);
    }
    .dark-mode #leftVerticalMenu button{
          background-color: rgb(60, 120, 200);
      color: white;
    }
    .dark-mode #userSignupForm input{
      background-color: rgb(45, 45, 45);
      color: rgb(200, 230, 255);
      border: 1px solid rgb(90, 90, 90);
      }
    .dark-mode #signup-form-wrapper h2,
    .dark-mode #signup-form-wrapper label{
    color: rgb(200, 230, 255);
      }
    .dark-mode .user-entry button,
    .dark-mode  .review-entry button,
    .dark-mode .content-entry button,
    .dark-mode .card-entry button{
     background-color: rgb(60, 120, 200);
      color: white;
    }
    .dark-mode #card-form-wrapper input,
    .dark-mode #card-form-wrapper textarea{
      background-color: rgb(45, 45, 45);
      color: rgb(200, 230, 255);
      border: 1px solid rgb(90, 90, 90);
      }
      .dark-mode #card-form-wrapper h2,
      .dark-mode #card-form-wrapper textarea::placeholder{
      color: rgb(200, 230, 255);
      }
        .dark-mode #card-form-wrapper h2,
      .dark-mode #card-form-wrapper input::placeholder,
      .dark-mode #card-form-wrapper label{
      color: rgb(200, 230, 255);
      }
      .dark-mode #leftVerticalMenu #logOutButton {
      background-color: red;
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