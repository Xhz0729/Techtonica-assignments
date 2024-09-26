import React, { useEffect, useState } from "react";
import './Weather.css'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'
import UserInputForm from "./UserInputForm";

const Weather = () => {
    const [weatherData, setWeatherData] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);


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
    // Function to handle both weather API and backend update for favorite city
    const handleUserSubmit = async ({ username, user_email, city, favorite }) => {
        try {
            let favorite_city;

            // Fetch user data to get the current favorite city if the user exists
            const userResponse = await fetch(`http://localhost:8080/user?email=${user_email}`);
            if (userResponse.ok) {
                const userData = await userResponse.json();
                favorite_city = favorite ? city : userData.favorite_city;
            } else {
                favorite_city = favorite ? city : null;
            }
          
            // Fetch weather data
            fetchWeatherData(city);

            // Send data to backend to add or update the user record

            const res = await fetch('http://localhost:8080/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    user_email,
                    favorite_city,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                alert(`Error: ${data.message}`);
            }
            setCurrentUser({ username, user_email, favorite_city });
        } catch (error) {
            console.error("Failed to update user", error);
        }
    };

    useEffect(() => {
        fetchWeatherData("New York");
    }, []);

    /* check whether we get weatherdata or not */
    return (
        <div className="weather">
             {currentUser &&
             <>
                <p>You are logged in as {currentUser.username}</p>
                <p>Your favorite city is {currentUser.favorite_city}</p>
             </>}
             <UserInputForm onSubmit={handleUserSubmit} />
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