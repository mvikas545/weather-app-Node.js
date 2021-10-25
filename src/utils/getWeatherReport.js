const request = require("request");
const getWeatherReport = (lon, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=d8c6a71162e9795da126fecb95aa48d2&query=${lat},${lon}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect weather service :(", undefined);
    } else if (response.body.error) {
      callback(response.body.error.info);
    } else {
      const data = response.body;
      const temp = data.current.temperature;
      const fellsLikeTemp = data.current.feelslike;
      callback(undefined, {
        weather_descriptions: data.current.weather_descriptions[0],
        temperature: data.current.temperature,
        weather_icon: data.current.weather_icons[0],
        wind_speed: data.current.wind_speed,
        humidity: data.current.humidity,
        location: data.location,
        precip: data.current.precip,
        pressure: data.current.pressure,
      });
    }
  });
};

module.exports = getWeatherReport;
