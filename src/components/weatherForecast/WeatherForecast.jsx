import { useState, useEffect, React } from 'react';
import './weatherForecast.scss';
import searchImageWeatherCodes from '../../utils/weatherCodesWMO';
import WeatherDay from './weatherDay/WeatherDay';
import Loader from '../loader/Loader';

import { mainApi } from '../../utils/open-meteo_api';
import { v4 as uuidv4 } from 'uuid';

const WeatherForecast = (props) => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [weatherCode, setWeatherCode] = useState('');
  const [timesOfDay, setTimesOfDay] = useState('');
  const [weatherDay, setWeatherDay] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
  }, [props.coordinates]);

  useEffect(() => {
    mainApi
      .getWeather(props.coordinates[0], props.coordinates[1])
      .then((res) => {
        setCurrentWeather(res.current_weather);
        setWeatherCode(res.current_weather.weathercode);
        setTimesOfDay(res.current_weather.is_day);
        creationArrWeather(res.hourly);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.coordinates]);

  const creationArrWeather = (hourly) => {
    const arrHourlyWeather = [];
    const numberHoursInDay = 24;
    const arrDaysWeather = [];
    for (let i = 0; i < hourly.time.length; i++) {
      let objHourlyWeather = {
        precipitation: hourly.precipitation[i],
        temperature_2m: hourly.temperature_2m[i],
        time: hourly.time[i],
        weathercode: hourly.weathercode[i],
        windspeed_10m: hourly.windspeed_10m[i],
      };
      arrHourlyWeather.push(objHourlyWeather);
    }
    for (let i = 0; i < arrHourlyWeather.length; i += numberHoursInDay) {
      arrDaysWeather.push(arrHourlyWeather.slice(i, i + numberHoursInDay));
    }
    setWeatherDay(arrDaysWeather);
  };

  return !loader ? (
    <section className="weather">
      <div className="weather__current">
        <h1 className="weather__current-title">Погода в г. {props.cityName} сейчас:</h1>
        <p className="weather__current-temperature">
          Температура: {currentWeather.temperature > 0 ? '+' + currentWeather.temperature : currentWeather.temperature}
          &deg;C
        </p>
        <p className="weather__current-windspeed">Ветер: {currentWeather.windspeed} м/с</p>
        <img className="weather__current-img" src={searchImageWeatherCodes(weatherCode, timesOfDay)} alt="Погода"></img>
      </div>
      <ul className="weather__day">
        {weatherDay ? weatherDay.map((weather) => <WeatherDay weather={weather} key={uuidv4()} />) : ''}
      </ul>
    </section>
  ) : (
    <Loader />
  );
};

export default WeatherForecast;
