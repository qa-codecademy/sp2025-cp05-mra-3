// all services list - start
let allServices = [];
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('/api/card');
        if (!res.ok) throw new Error('Failed to fetch services');

        const services = await res.json();
        const publicServices = services.filter(service => service.public === "yes");
        const sortedServices = publicServices
            .map(card => ({
                ...card,
            }))
            .sort((a, b) => {
                const numberA = a.number || '';
                const numberB = b.number || '';
                return numberA.localeCompare(numberB);
            });

        allServices = sortedServices

        renderServicesTable(allServices);
    } catch (err) {
        console.error('Error fetching services:', err);
        alert('Could not load services.');
    }
});;

function renderServicesTable(services) {
    const container = document.getElementById('servicesContainer');
    container.innerHTML = '';

    services.forEach(service => {
        const entry = document.createElement('div');
        entry.classList.add('service');


        if (localStorage.getItem('language') === "English") {
        entry.innerHTML = `
  <h3>${service.titleENG}</h3>
  <div class="image-service-container">
    <img id="imgService${service.id}" src="${service.picture}" alt="${service.titleENG}" />
  </div>
  <p class="service-description">${service.descriptionENG}</p>
`;
} else if (localStorage.getItem('language') === "Macedonian") {
  entry.innerHTML = `
    <h3>${service.titleMKD}</h3>
    <div class="image-service-container">
      <img id="imgService${service.id}" src="${service.picture}" alt="${service.titleMKD}" />
    </div>
    <p class="service-description">${service.descriptionMKD}</p>
  `;
} else {
  entry.innerHTML = `
    <h3>${service.titleDEU}</h3>
    <div class="image-service-container">
      <img id="imgService${service.id}" src="${service.picture}" alt="${service.titleDEU}" />
    </div>
    <p class="service-description">${service.descriptionDEU}</p>
  `;
        }
        container.appendChild(entry);
    });
    
}

// all services list - end