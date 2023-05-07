import { useState, useEffect, React } from 'react';
import './weatherDay.scss';
import searchWeatherCodes from '../../../utils/weatherCodesWMO';
import findDayOfWeek from '../../../utils/findDayOfWeek';

import dayjs from 'dayjs';

const WeatherDay = (props) => {
  const [minTemperature, setMinTemperature] = useState('');
  const [maxTemperature, setMaxTemperature] = useState('');
  const [sumPrecipitation, setSumPrecipitation] = useState('');
  const [worstWeathercode, setWorstWeathercode] = useState('');
  const [maxWindSpeed, setMaxWindSpeed] = useState('');

  useEffect(() => {
    const temperatureDay = [];
    const weathercodeDay = [];
    const precipitationDay = [];
    const windSpeedDay = [];

    for (let i = 0; i < props.weather.length; i++) {
      temperatureDay.push(props.weather[i].temperature_2m);
      weathercodeDay.push(props.weather[i].weathercode);
      precipitationDay.push(props.weather[i].precipitation);
      windSpeedDay.push(props.weather[i].windspeed_10m);
    }

    setMinTemperature(sortArr(temperatureDay)[0]);
    setMaxTemperature(sortArr(temperatureDay).at(-1));
    setMaxWindSpeed(sortArr(windSpeedDay).at(-1));
    setSumPrecipitation(
      Math.round(
        precipitationDay.reduce((sum, current) => {
          return sum + current;
        }, 0),
      ),
    );
    setWorstWeathercode(searchWeatherCodes(sortArr(weathercodeDay).at(-1), 1));
  }, [props.weather]);

  const sortArr = (arr) => {
    return arr.sort((a, b) => {
      return a - b;
    });
  };

  return (
    <li className="weather-day">
      <h3 className="weather-day__date">
        {findDayOfWeek(dayjs(props.weather[0].time).day()) + dayjs(props.weather[0].time).format(' DD.MM')}
      </h3>
      <p className="weather-day__min-temperature">
        От {minTemperature > 0 ? '+' + minTemperature : minTemperature}&deg;C
      </p>
      <p className="weather-day__max-temperature">
        До {maxTemperature > 0 ? '+' + maxTemperature : maxTemperature}&deg;C
      </p>
      <p className="weather-day__precipitation">Осадки: {sumPrecipitation} мм.</p>
      <p className="weather-day__max-windspeed">Ветер до : {maxWindSpeed} м/с</p>
      <img className="weather-day__img" src={worstWeathercode} alt="Погода"></img>
    </li>
  );
};

export default WeatherDay;
