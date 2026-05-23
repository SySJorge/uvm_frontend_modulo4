const weatherForm = document.querySelector('#weatherForm');
const search = document.querySelector('#address');

const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');
const messageThree = document.querySelector('#messageThree');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = search.value.trim();

    messageOne.textContent = 'Buscando información del clima...';
    messageTwo.textContent = '';
    messageThree.textContent = '';

    fetch('/weather?address=' + encodeURIComponent(location))
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = `${data.location}, ${data.country}`;
                messageTwo.textContent = `Clima: ${data.description}. Temperatura actual: ${data.temperature}°C. Sensación térmica: ${data.feelslike}°C.`;
                messageThree.textContent = `Humedad: ${data.humidity}%. Viento: ${data.windSpeed} km/h.`;
            }
        })
        .catch(() => {
            messageOne.textContent = 'Ocurrió un error al consultar el clima.';
        });
});