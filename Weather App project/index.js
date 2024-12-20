const APP_ID = '25783902677867676ac2f2cf36c0c8e4';

document.getElementById('get-weather').addEventListener('click', async () => {
    const cityInput = document.getElementById('city-input').value.trim();
    const weatherDisplay = document.getElementById('weather-display');
    const loadingIndicator = document.getElementById('loading-indicator');

    if (!cityInput) {
        alert('Пожалуйста, введите название города');
        return;
    }

    weatherDisplay.innerHTML = '';
    loadingIndicator.classList.remove('hidden');

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${APP_ID}&units=metric`);
        const data = await response.json();

        loadingIndicator.classList.add('hidden');

        if (response.ok) {
            const { name, main, weather } = data;
            const icon = weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;

            weatherDisplay.innerHTML = `
                <div class="weather-info">
                    <h2>${name}</h2>
                    <p>Температура: ${main.temp}°C</p>
                    <img src="${iconUrl}" alt="Weather icon">
                </div>
            `;
        } else {
            weatherDisplay.innerHTML = `
                <div class="error">
                    <p>Ошибка: ${data.cod} - ${data.message}</p>
                </div>
            `;
        }
    } catch (error) {
        loadingIndicator.classList.add('hidden');
        weatherDisplay.innerHTML = `
            <div class="error">
                <p>Произошла ошибка при выполнении запроса</p>
            </div>
        `;
    }
});
