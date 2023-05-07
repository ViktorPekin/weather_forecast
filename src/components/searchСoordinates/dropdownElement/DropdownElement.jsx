import React from 'react';
import './dropdownElement.scss';

const DropdownElement = (props) => {
  const changeLocations = () => {
    props.onCoordinates([props.city.latitude, props.city.longitude]);
    props.onCityName(props.city.name);
    props.onValueCity('');
    props.onListCity('');
  };

  return (
    <li className="dropdown-element">
      <button
        className="dropdown-element__link"
        type="button"
        onClick={(e) => {
          changeLocations(e);
        }}
      >
        {props.city.name},{props.city.admin1}
      </button>
    </li>
  );
};

export default DropdownElement;
