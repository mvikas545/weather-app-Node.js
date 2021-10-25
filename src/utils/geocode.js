const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibXZpa2FzNTQ1IiwiYSI6ImNrdjF4ZjE5aDA0bnoyb2xqcDAyY21uaWMifQ.EdFaqFHkg72Sa-13zdvuIw&limit=1`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect geolocation service :(", undefined);
    } else if (response.body.message) {
      callback(response.body.message, undefined);
    } else if (response.body.features.length === 0) {
      callback("Location not found,Please enter valid address.", undefined);
    } else {
      const data = response.body.features[0];
      callback(undefined, {
        longitude: data.center[0],
        latitude: data.center[1],
        location: data.place_name,
      });
    }
  });
};

module.exports = geocode;
