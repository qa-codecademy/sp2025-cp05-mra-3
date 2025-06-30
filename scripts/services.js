// all services list - start
let allServices = [];
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('/api/card');
        if (!res.ok) throw new Error('Failed to fetch services');

        const services = await res.json();
        const sortedServices = services
            .map(card => ({
                ...card,
            }))
            .sort((a, b) => {
                const titleA = a.titleDEU || '';
                const titleB = b.titleDEU || '';
                return titleA.localeCompare(titleB);
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
        // entry.classList.add('service');
        entry.classList.add('service-card', 'service');


        if (localStorage.getItem('language') === "English") {
            entry.innerHTML = `
        <h3> ${service.titleENG}</h3>
        <div class="image-service-container" style="width: 100%; margin-top: 0.5em;">
            <img id="imgService${service.id}" src="${service.picture}" style="width: 100%; height: auto; display: block; object-fit: contain;" />
        </div>
        <p id="service-description">${service.descriptionENG}</p>
      `;
        } else if (localStorage.getItem('language') === "Macedonian") {
            entry.innerHTML = `
        <h3> ${service.titleMKD}</h3>
        <div class="image-service-container" style="width: 100%; margin-top: 0.5em;">
            <img id="imgService${service.id}" src="${service.picture}" style="width: 100%; height: auto; display: block; object-fit: contain;" />
        </div>
        <p id="service-description">${service.descriptionMKD}</p>
      `;
        } else {
            entry.innerHTML = `
        <h3> ${service.titleDEU}</h3>
        <div class="image-service-container" style="width: 100%; margin-top: 0.5em;">
            <img id="imgService${service.id}" src="${service.picture}" style="width: 100%; height: auto; display: block; object-fit: contain;" />
        </div>
        <p id="service-description">${service.descriptionDEU}</p>
      `;
        }
        container.appendChild(entry);
    });
    
}

// all services list - end