// --------- const for API key ------------
const apiKey = '670762e49264343f677bf96120f4b4ac';

// --------------- Async/ Await with fetch-----------
async function getWeather() {
    // -----------Template literals and const --------------
    const city = document.getElementById('cityInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric` ;

    try {
        // ----------Await with feath----------
        const response = await fetch(url);
        if (!response.ok) {
            // --------------throw in async/await context----------------
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // ------------Distructing JSON response --------------
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Failed to featch weather data:', error);
        alert('Failed to featch Weather data.');
    }
}

function displayWeather(data) 
{
    // --------------Destructing for easier access to nested data -----------------
    const { main: { temp, humidity }, weather, wind: { speed }, sys: { country }, name } = data;
    const [{ main: weatherMain, description, icon }] = weather; // nested destructing

    //--------const for DOM manipulation----------
    const weatherDisplay = document.getElementById('weatherDisplay');
    if (data.cod !== 200) {
        weatherDisplay.innerHTML = `<p>Error: ${data.message}</p>` ;
        return;

    }

    //---------template literals for HTMLgeneration----------
    const WeatherHTML =`
        <h2>Weather in ${name}, ${country}</h2> 
        <p>Temperature: ${temp} °C</p>
        <p>Weather: ${weatherMain} (${description})</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind: ${speed} m/s</p>
        <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather icon"></img>
    `;
    weatherDisplay.innerHTML = WeatherHTML;

}