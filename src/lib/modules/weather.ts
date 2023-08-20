import { SHARJAH_COORDINATES, OWN_API_KEY } from "./constants";

export async function getSharjahWeather(): Promise<string> {

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${SHARJAH_COORDINATES.lat}&lon=${SHARJAH_COORDINATES.lon}&units=metric&appid=${OWN_API_KEY}`);

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

