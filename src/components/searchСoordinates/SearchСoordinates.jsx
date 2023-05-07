import { useState, React } from 'react';
import './searchCoordinates.scss';
import DropdownElement from './dropdownElement/DropdownElement';

import { mainApi } from '../../utils/open-meteo_api';
import { v4 as uuidv4 } from 'uuid';

const SearchCoordinates = (props) => {
  const [listCity, setListCity] = useState('');
  const [valueCity, setValueCity] = useState('');

  const changeCity = (e) => {
    handleListCity(e.target.value);
    setValueCity(e.target.value);
  };

  const handleListCity = (city) => {
    mainApi
      .getСoordinates(city)
      .then((res) => {
        res.results ? setListCity(res) : setListCity('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="seatch-coordinates">
      <input
        value={valueCity}
        onChange={(e) => {
          changeCity(e);
        }}
        className="seatch-coordinates__input"
        placeholder="Город"
      />
      <ul
        className={
          listCity ? 'seatch-coordinates__dropdown seatch-coordinates__dropdown_active' : 'seatch-coordinates__dropdown'
        }
      >
        {listCity
          ? listCity.results.map((city) => (
              <DropdownElement
                onCoordinates={props.onCoordinates}
                onCityName={props.onCityName}
                onListCity={setListCity}
                onValueCity={setValueCity}
                city={city}
                key={uuidv4()}
              />
            ))
          : ''}
      </ul>
    </form>
  );
};

export default SearchCoordinates;
