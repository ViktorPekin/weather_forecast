import { React, useState } from 'react';
import './App.scss';
import SearchCoordinates from '../searchСoordinates/SearchСoordinates';
import WeatherForecast from '../weatherForecast/WeatherForecast';

function App() {
  const [coordinates, setCoordinates] = useState([]);
  const [cityName, setCityName] = useState('');

  return (
    <div className="App">
      <SearchCoordinates onCoordinates={setCoordinates} onCityName={setCityName} />
      {coordinates.length > 0 ? <WeatherForecast coordinates={coordinates} cityName={cityName} /> : ''}
    </div>
  );
}

export default App;
