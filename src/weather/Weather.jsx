import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import sun from '../assets/sun.png'; 
import humidityicon from '../assets/humidity.png'; 
import windicon from '../assets/wind-speed.jpg';
import rain from '../assets/rain.png';
import drizzle from '../assets/drizzleweather.webp';
import snow from '../assets/snow.jpeg';

const WeatherDetails = ({ icon, temp, city, country, lat, lon, humidity, wind }) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="image" className='sun' />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className='lat'>latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='lon'>longitude</span>
          <span>{lon}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityicon} alt="humidity" className='icon' />
          <div className="percent">{humidity}</div>
          <div className="text">Humidity</div>
        </div>
        <div className="element">
          <img src={windicon} alt="wind" className='icon' />
          <div className="percent">{wind}</div>
          <div className="text">windSpeed</div>
        </div>
      </div>
    </>
  );
};

export const Weather = () => {
  const [text, setText] = useState("chennai");
  const [icon, setIcon] = useState(sun);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("chennai");
  const [country, setCountry] = useState("In");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const weatherIconMap = {
    "01d": sun,
    "01n": sun,
    "02d": sun,
    "02n": sun,
    "03d": drizzle,
    "03n": drizzle,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "11d": rain,
    "11n": rain,
    "13d": snow,
    "13n": snow,
    "50d": snow,
    "50n": snow,
  };

  const search = async () => {
    setLoading(true);
    const api_key = "2cd164ceda900fd3663615e9e238d539";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      const data = await response.json();
      const iconCode = data.weather[0].icon;
      setIcon(weatherIconMap[iconCode] || sun); // Update with actual icon from API response
      setTemp(data.main.temp);
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setCityNotFound(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handle = (e) => {
    setText(e.target.value);
  };

  const keydown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <>
      <div className="container">
        <div className="input-box">
          <input type="text" placeholder='Search city' className='city' onChange={handle} value={text} onKeyDown={keydown} />
          <FontAwesomeIcon icon={faMagnifyingGlass} className='search' onClick={search} />
        </div>
        {loading ? <p>Loading...</p> : cityNotFound ? <p>City not found</p> : <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} lon={lon} humidity={humidity} wind={wind} />}
        <p>Developed by Hussain</p>
      </div>
    </>
  );
};
