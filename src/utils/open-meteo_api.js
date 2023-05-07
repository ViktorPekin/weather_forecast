class OpenMeteoApi {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._header = config.header;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((res) => {
      if (res.validation) {
        throw new Error(res.validation.body.message);
      } else {
        throw new Error(res.message);
      }
    });
  }

  getСoordinates(city) {
    return fetch(`https://geocoding-api.${this._baseUrl}/search?name=${city}&language=ru`, {
      method: 'GET',
      headers: this.header,
    }).then(this._checkResponse);
  }

  getWeather(latitude, longitude) {
    return fetch(
      `https://api.${this._baseUrl}/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode,precipitation,windspeed_10m&current_weather=true`,
      {
        method: 'GET',
        headers: this.header,
      },
    ).then(this._checkResponse);
  }
}

export const mainApi = new OpenMeteoApi({
  baseUrl: 'open-meteo.com/v1',
  header: {
    'Content-Type': 'application/json',
  },
});
