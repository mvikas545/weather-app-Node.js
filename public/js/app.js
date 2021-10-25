console.log("hi there");

const form = document.querySelector("form");
const search = document.querySelector("form input");

const region = document.getElementById("region");
const country = document.getElementById("country");
const weatherDescription = document.getElementById("weather-description");
const date = document.getElementById("date");
const temperature = document.getElementById("temp");
const weatherIcon = document.getElementById("weather-icon");
const windSpeed = document.getElementById("wind-speed");
const percip = document.getElementById("precip");
const pressure = document.getElementById("pressure");

const slogan = document.querySelector(".slogan");
const weatherCard = document.querySelector(".card");
const invalidCard = document.querySelector(".invalid-search");

const submitBtn = document.querySelector(".button");
const btnText = document.querySelector(".button__text");

const setDataHandler = (data) => {
  btnText.classList.remove("transparent");
  submitBtn.classList.remove("button--loading");
  console.log(data);

  if (data.error) {
    slogan.classList.add("hide");
    weatherCard.classList.add("hide");
    invalidCard.classList.remove("hide");
  } else {
    invalidCard.classList.add("hide");
    slogan.classList.add("hide");
    weatherCard.classList.remove("hide");
    const address = data.address.split(",");
    region.textContent = [address[0], address[1]].join(",");
    country.textContent = data.location.country;
    date.textContent = data.location.localtime.split(" ")[0];
    temperature.textContent = data.temperature;
    weatherDescription.innerHTML = data.weather_descriptions;
    weatherIcon.src = data.weather_icon;
    windSpeed.textContent = `Wind: ${data.wind_speed} kmph`;
    precip.textContent = `Percip: ${data.precip} mm`;
    pressure.textContent = `Pressure:  ${data.pressure} mb`;
  }
};
search.addEventListener("input", (e) => {
  if (e.target.value) {
    search.classList.remove("error-highlight");
  }
});
form.addEventListener("submit", (e) => {
  console.log("clicked");
  e.preventDefault();
  if (search.value) {
    btnText.classList.add("transparent");
    submitBtn.classList.add("button--loading");
    search.classList.remove("error-highlight");
    fetch(`/weather?address=${search.value}`).then((response) => {
      response.json().then(setDataHandler);
    });
  } else {
    search.classList.add("error-highlight");
  }
});
