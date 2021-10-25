const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const getWeatherReport = require("./utils/getWeatherReport");

const port = process.env.PORT || 3000;
const app = express();

const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs"); // hbs: Handlebars template
app.set("views", viewPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "@mvikas",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page!",
    address: "varanasi",
    name: "@mvikas",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page!",
    name: "@mvikas",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address is missing its must be there!",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) res.send({ error });
    else {
      const { longitude, latitude, location } = data;
      getWeatherReport(longitude, latitude, (error, data) => {
        if (error) res.send({ error });
        if (data)
          res.send({
            ...data,
            address: location,
          });
      });
    }
  });
  //   res.send({
  //     address: req.query.address,
  //     forecast: "Clear",
  //     location: "Varanasi uttar pradesh",
  //   });
});

app.get("/help/*", (req, res) => {
  res.render("pageNotFound", {
    errorMessage: "Article is not found  :(",
    title: "Hepl page!",
    name: "vikash chandra maurya",
  });
});
app.get("/*", (req, res) => {
  res.render("pageNotFound", {
    errorMessage: "404 Page not found :(",
    name: "vikash chandra maurya",
  });
});

app.listen(port, () => {
  console.log(`Server is listening port ${port}!`);
});
