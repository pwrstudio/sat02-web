import { SHARJAH_COORDINATES, OWN_API_KEY } from "./constants";

/**
 * Fetches and returns the current weather in Sharjah as a string, formatted as [temperature]°C / [weather description].
 * The weather information includes the temperature in Celsius and a textual description of the weather (e.g., "Clear sky").
 * In case of a failed fetch operation, logs the error and returns a descriptive error message.
 * 
 * @async
 * @function
 * @export
 * 
 * @returns {Promise<string>} - A promise that resolves to a string describing the current weather in Sharjah. 
 * If the weather data cannot be fetched, it resolves to a string with an error message.
 * 
 * @throws Will log any errors related to fetching the data to the console.
 * 
 * @example
 * getSharjahWeather()
 *   .then(weather => console.log(weather)) // Example output: "25°C / Clear sky"
 *   .catch(error => console.error(error));
 */
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

