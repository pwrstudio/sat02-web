
export async function getSharjahWeather(): Promise<string> {
    const API_KEY = '9503055d09f6f4afda4d4e550767aa84'; // Replace with your API key

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=25.3463&lon=55.4209&units=metric&appid=${API_KEY}`);
        console.log(response)

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;

        return `${Math.floor(temperature)}°C / ${weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}`; // Capitalize first letter of description
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return "Error fetching weather";
    }
}

