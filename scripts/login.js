document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const errorMessage = document.getElementById("errorMessage");

    // Clear previous messages
    errorMessage.textContent = "";
    username.classList.remove("error");
    password.classList.remove("error");

    // Validation
    if (!username.value || !password.value) {
      errorMessage.textContent = "Please fill in all fields.";
      if (!username.value) username.classList.add("error");
      if (!password.value) password.classList.add("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username.value)) {
      errorMessage.textContent = "Enter a valid email address.";
      username.classList.add("error");
      return;
    }

    if (password.value.length < 6) {
      errorMessage.textContent = "Password must be at least 6 characters.";
      password.classList.add("error");
      return;
    }

    // Fake login
    if (
      username.value === "admin@example.com" &&
      password.value === "password123"
    ) {
      alert("Login successful!");
    } else {
      errorMessage.textContent = "Invalid credentials.";
    }
  });
