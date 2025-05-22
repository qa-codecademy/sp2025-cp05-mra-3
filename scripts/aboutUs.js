window.addEventListener("DOMContentLoaded", () => {
  axios.get("../data/aboutUsData.json")
    .then((response) => {
      const { data } = response;
      const container = document.getElementById("cardContainer");
      container.innerHTML = '';
      
      // Create navigation dots
      const dotsContainer = document.createElement("div");
      dotsContainer.className = "dots-container";
      
      // Create cards
      let currentIndex = 0;
      const cards = data.cards.map((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.className = `service-card ${index === 0 ? 'active' : ''}`;
        
        cardElement.innerHTML = `
          <img src="${card.image}" alt="${card.title || "Service image"}">
          <div class="service-card-content">
            <h2>${card.title || "Untitled Service"}</h2>
            <p>${card.description || ""}</p>
          </div>
        `;

        container.appendChild(cardElement);
        return cardElement;
      });

      // Create dots
      data.cards.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener("click", () => {
          showCard(index);
          resetInterval();
        });
        dotsContainer.appendChild(dot);
      });
      
      container.appendChild(dotsContainer);

      // Card rotation functions
      function showCard(index) {
        cards.forEach((card, i) => {
          card.classList.toggle('active', i === index);
        });
        document.querySelectorAll(".dot").forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
      }

      function nextCard() {
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(currentIndex);
      }

      function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextCard, 5000);
      }

      let interval = setInterval(nextCard, 5000);
    })
    .catch((error) => {
      console.error("Error:", error);
      const container = document.getElementById("cardContainer");
      if (container) {
        container.innerHTML = `
          <div class="error-container">
            <h3 class="error-title">Error while loading.</h3>
            <p class="error-message">${error.message}</p>
          </div>
        `;
      }
    });
});