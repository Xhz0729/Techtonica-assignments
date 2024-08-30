import React, { useEffect, useRef, useState } from "react";
import './Weather.css'
import search_icon from '../assets/search.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {
    const [weatherData, setWeatherData] = useState(false);
    const inputRef = useRef();

    // Fetch data from your backend instead of OpenWeatherMap directly
    const fetchWeatherData = async (city) => {
        try { 
            const url = `/api/weather?city=${city}`;
            const res = await fetch(url);
            const data = await res.json();
            if (!res.ok) {
                alert(data.message);
                return;
            }
            const icon_id = data.weather[0].icon;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: data.main.temp,
                city: data.name,
                icon: `https://openweathermap.org/img/wn/${icon_id}@2x.png`
            });
        } catch (err) {
            setWeatherData(false);
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchWeatherData("New York");
    }, []);

    // handle submit
    function handleSubmit(e) {
        e.preventDefault(); // Prevent the default form submission
        fetchWeatherData(inputRef.current.value);
    }

    /* check whether we get weatherdata or not */
    return (
        <div className="weather">
            <form className="search-bar" onSubmit={handleSubmit}>
                <input ref={inputRef} type="text" placeholder="Search" />
                <button type="submit" >
                    <img src={search_icon} alt="search icon" />
                </button>
            </form>
            {weatherData ? 
                <>
                    <img src={weatherData.icon} alt="weather icon" className="weather-icon" />
                    <p className="temp">{weatherData.temperature} F</p>
                    <p className="city">{weatherData.city}</p>
                    <div className="weather-data">
                        <img src={humidity_icon} alt="humidity icon" />
                        <div>
                            <p>{weatherData.humidity} %</p>
                            <span>Humidity</span>
                        </div>
                        <img src={wind_icon} alt="wind icon" />
                        <div>
                            <p>{weatherData.windSpeed} Km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </> : <></>}
        </div>
    );
}

export default Weather;