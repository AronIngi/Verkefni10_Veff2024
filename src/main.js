import { createApp } from "vue";
import App from "./App.vue";
import { citySearch } from "./lib/city.js";
import { weatherSearch } from "./lib/weather.js";
import { el } from "./lib/elements.js";
import { createMap } from "./lib/createMap.js";

const app = createApp(App);
app.mount("#app");

function initMap() {
  const map_container = document.createElement("div");
  map_container.setAttribute("id", "map");

  document.querySelector("main").appendChild(map_container);
}

function renderIntoContainer(element) {
  if (document.querySelector(".forecast")) {
    document
      .querySelector("main")
      .removeChild(document.querySelector(".forecast"));
  }
  if (document.querySelector("#map")) {
    document.querySelector("main").removeChild(document.querySelector("#map"));
  }
  document.querySelector("main").appendChild(element);
}

function renderError(message) {
  const heading = document.querySelector(".table-heading");
  heading.innerHTML = message;
}

function renderGeoError(error) {
  const heading = document.querySelector(".table-heading");
  heading.innerHTML = `Error ${error.code}: ${error.message}`;
}

function renderLoading() {
  const heading = document.querySelector(".table-heading");
  heading.innerHTML = "Loading...";
}

function renderTableHeading(data) {
  const text = `${data.name} ${data.latitude} ${data.longitude}`;

  document.querySelector(".table-heading").innerHTML = text;
}

function renderTable(data) {
  const table_body = el("tbody", {});
  table_body.classList.add("forecast");

  for (var i = 0; i < 24; i++) {
    const row = el(
      "tr",
      {},
      el("td", {}, `${data.hourly.time[i]}`),
      el("td", {}, `${data.hourly.temperature[i]}`),
      el("td", {}, `${data.hourly.precipitation[i]}`),
    );
    table_body.appendChild(row);
  }

  const table = el(
    "table",
    {},
    el("th", {}, "Klukkutími"),
    el("th", {}, `Hitastig (${data.units.temperature})`),
    el("th", {}, `Úrkoma (${data.units.precipitation})`),
    table_body,
  );
  table.classList.add("forecast");

  const main = document.querySelector("main");
  renderIntoContainer(table);
}

async function onMySearch(location) {
  try {
    var crd = location.coords;
    renderLoading();
    const weather_data = await weatherSearch(crd.latitude, crd.longitude);
    renderTableHeading({
      name: "",
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    renderTable(weather_data);

    initMap();
    createMap(coord.longitude, coords.latitude);
  } catch (e) {
    renderError(e);
  }
}

async function onSearch(location, units) {
  try {
    renderLoading();
    const city_data = await citySearch(location);
    const weather_data = await weatherSearch(
      city_data.latitude,
      city_data.longitude,
      units.temp_unit,
      units.prec_unit,
    );

    renderTableHeading(city_data);
    renderTable(weather_data);

    initMap();
    createMap(city_data.longitude, city_data.latitude);
  } catch (e) {
    if (e.name === "TypeError")
      renderError("Gat ekki fundið þessa staðsetningu");
  }
}

const search_form = document.querySelector(".search_form");
search_form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.querySelector(".search_bar").value;
  const units = {
    temp_unit: document.querySelector(".temp_unit").value.toLowerCase(),
    prec_unit: document.querySelector(".prec_unit").value.toLowerCase(),
  };
  onSearch(city, units);
});

const my_location_button = document.querySelector(".my-location");
my_location_button.addEventListener("click", (event) => {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(onMySearch, renderGeoError);
});
