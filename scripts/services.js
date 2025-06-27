// function changeStyle(newStyle) {
//   const oldStyle = localStorage.getItem('selectedStyle');
//   if (oldStyle !== newStyle) {
//     localStorage.setItem('selectedStyle', newStyle);

//     window.dispatchEvent(new StorageEvent('storage', {
//       key: 'selectedStyle',
//       oldValue: oldStyle,
//       newValue: newStyle,
//       storageArea: localStorage
//     }));
//   }
// }
// window.addEventListener("DOMContentLoaded", () => {

//   function loadServices() {
//     axios
//       .get("../data/servicesData.json")
//       .then((response) => {
//         const data = response.data;

//         let availableStyles = JSON.parse(localStorage.getItem("availableStyles"));
//         if (!availableStyles) {
//           availableStyles = Object.keys(data.cardStyle);
//           localStorage.setItem(
//             "availableStyles",
//             JSON.stringify(availableStyles)
//           );
//         }

//         let selectedStyle = localStorage.getItem("selectedStyle");

//         if (!selectedStyle || !availableStyles.includes(selectedStyle)) {
//           selectedStyle = availableStyles[0];
//           localStorage.setItem("selectedStyle", selectedStyle);
//         }

//         const cardStyle = data.cardStyle[selectedStyle];
//         const container = document.getElementById("cardContainer");
//         container.innerHTML = "";



//         const styleElement = document.createElement("style");
//         styleElement.setAttribute('data-service-styles', 'true');
//         document.head.appendChild(styleElement);

//         data.cards.forEach((card, index) => {
//           const cardDiv = document.createElement("div");
//           cardDiv.className = `service-card service-card-${index}`;

//           for (const prop in cardStyle) {
//             if (!prop.startsWith(":")) {
//               cardDiv.style[prop] = cardStyle[prop];
//             }
//           }

//           cardDiv.innerHTML = `
//             <h2>${card.title || "Untitled Service"}</h2>
//             <p>${card.description || "No description available"}</p>
//             ${card.image
//               ? `<img src="${card.image}" alt="${card.title || "Service image"
//               }">`
//               : ""
//             }
//           `;

//           const hoverClass = `service-card-hover-${index}`;
//           cardDiv.classList.add(hoverClass);

//           let hoverCSS = `.${hoverClass}:hover { `;

//           const hoverStyles = cardStyle[":hover"];
//           for (const key in hoverStyles) {
//             const cssProp = key.replace(/([A-Z])/g, "-$1").toLowerCase();
//             hoverCSS += `${cssProp}: ${hoverStyles[key]}; `;
//           }

//           hoverCSS += `}`;

//           styleElement.sheet.insertRule(
//             hoverCSS,
//             styleElement.sheet.cssRules.length
//           );

//           container.appendChild(cardDiv);
//         });

//         console.log(`Services loaded with style: ${selectedStyle}`);
//       })
//       .catch((error) => {
//         console.error("Error while loading :", error);
//         const container = document.getElementById("cardContainer");
//         if (container) {
//           container.innerHTML = `
//             <div class="error-container">
//               <h3 class="error-title">Error while loading </h3>
//               <p class="error-message">${error.message}</p>
//             </div>
//           `;
//         }
//       });
//   }


//   loadServices();

//   window.addEventListener('storage', (e) => {
//     if (e.key === 'selectedStyle') {
//       console.log('Style changed from another tab, reloading services...');
//       loadServices();
//     }
//   });


// });