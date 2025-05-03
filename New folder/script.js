document.getElementById("loadBtn").addEventListener("click", () => {
  axios
    .get("data.json") /// tuka ja zemame json file datata
    .then((response) => {
      const { cardStyle, cards } = response.data; //// console log response.data; za da vidis sto imas vo nego i see ke ti ee jasno kako funkcionira
      const container = document.getElementById("cardContainer");
      container.innerHTML = "";

      cards.forEach((card) => {
        const cardElement = document.createElement("div");

        // dodajgo style na kartite
        Object.entries(cardStyle).forEach(([key, value]) => {
          cardElement.style[key] = value;
        });

        // dodajgo kontentot na kartite
        cardElement.innerHTML = `
            <h2>${card.title}</h2>
            <p>${card.description}</p>
          `;

        container.appendChild(cardElement);
      });
    })
    .catch((error) => {
      console.error("Error loading JSON:", error);
    });
});
