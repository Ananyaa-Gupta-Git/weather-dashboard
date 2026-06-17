const API_KEY = "76469144d736c1da5f150d3b3e2acb95";

export async function fetchCurrentWeather(city){

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if(!response.ok){
        throw new Error("City not found");
    }

    return await response.json();
}

export async function fetchForecast(city){

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    if(!response.ok){
        throw new Error("Forecast unavailable");
    }

    return await response.json();
}