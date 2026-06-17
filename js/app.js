import {
    fetchCurrentWeather,
    fetchForecast
} from "./api.js";

import {
    saveUserPreferences,
    loadUserPreferences
} from "./storage.js";

const cityInput =
document.getElementById("cityInput");

const searchBtn =
document.getElementById("searchBtn");

const currentWeather =
document.getElementById("currentWeather");

const forecastContainer =
document.getElementById("forecastContainer");

const loader =
document.getElementById("loader");

const errorMessage =
document.getElementById("errorMessage");

const themeToggle =
document.getElementById("themeToggle");

let preferences = loadUserPreferences();

document.body.classList.toggle(
    "dark",
    preferences.theme === "dark"
);

cityInput.value =
preferences.defaultCity;

async function loadWeather(city){

    try{

        loader.classList.remove("hidden");
        errorMessage.textContent = "";

        const weather =
        await fetchCurrentWeather(city);

        const forecast =
        await fetchForecast(city);

        displayCurrentWeather(weather);

        displayForecast(forecast);

        preferences.defaultCity = city;

        saveUserPreferences(preferences);

    }catch(error){

        errorMessage.textContent =
        error.message;

    }finally{

        loader.classList.add("hidden");
    }
}

function displayCurrentWeather(data){

    currentWeather.innerHTML = `
        <h2>${data.name}</h2>
        <img
        src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">

        <p>${data.main.temp} °C</p>

        <p>${data.weather[0].description}</p>

        <p>Humidity: ${data.main.humidity}%</p>

        <p>Wind: ${data.wind.speed} m/s</p>
    `;
}

function displayForecast(data){

    forecastContainer.innerHTML = "";

    const dailyData =
    data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    dailyData.forEach(day => {

        forecastContainer.innerHTML += `
            <div class="forecast-card">

                <h3>
                ${new Date(day.dt_txt)
                    .toLocaleDateString()}
                </h3>

                <img
                src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">

                <p>${day.main.temp} °C</p>

                <p>${day.weather[0].main}</p>

            </div>
        `;
    });
}

searchBtn.addEventListener(
    "click",
    () => {

        const city =
        cityInput.value.trim();

        if(city){
            loadWeather(city);
        }
    }
);

cityInput.addEventListener(
    "keypress",
    e => {

        if(e.key === "Enter"){
            searchBtn.click();
        }
    }
);

themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );

        preferences.theme =
        document.body.classList.contains("dark")
            ? "dark"
            : "light";

        saveUserPreferences(preferences);
    }
);

loadWeather(
    preferences.defaultCity
);