import React, { useEffect, useRef, useState } from "react";
import './Weather.css'
import search_icon from '../assets/search.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {
    const [weatherdata, setWeatherdata] = useState(false);
    const inputRef = useRef();

    // Fetch data from your backend instead of OpenWeatherMap directly
    const search = async (city) => {
        try { 
            const url = `/api/weather?city=${city}`;
            const res = await fetch(url);
            const data = await res.json();
            if (!res.ok) {
                alert(data.message);
                return;
            }
            const icon_id = data.weather[0].icon;
            setWeatherdata({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: data.main.temp,
                city: data.name,
                icon: `https://openweathermap.org/img/wn/${icon_id}@2x.png`
            });
        } catch (err) {
            setWeatherdata(false);
            console.log(err.message);
        }
    };

    useEffect(() => {
        search("New York");
    }, []);
    /* check whether we get weatherdata or not */
    return (
        <div className="weather">
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder="Search" />
                <img src={search_icon} alt="search icon" onClick={() => search(inputRef.current.value)} />
            </div>
            {weatherdata ?
                <>
                    <img src={weatherdata.icon} alt="weather icon" className="weather-icon" />
                    <p className="temp">{weatherdata.temperature} F</p>
                    <p className="city">{weatherdata.city}</p>
                    <div className="weather-data">
                        <img src={humidity_icon} alt="humidity icon" />
                        <div>
                            <p>{weatherdata.humidity} %</p>
                            <span>Humidity</span>
                        </div>
                        <img src={wind_icon} alt="wind icon" />
                        <div>
                            <p>{weatherdata.windSpeed} Km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </> : <></>}
        </div>
    );
}

export default Weather;