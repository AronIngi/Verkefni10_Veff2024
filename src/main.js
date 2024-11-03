import { createApp } from "vue";
import App from "./App.vue";
import { citySearch } from "./lib/city.js";
import { weatherSearch } from "./lib/weather.js";
import { el } from "./lib/elements.js";
import { createMap } from "./lib/createMap.js";
import { renderError, renderGeoError, renderLoading, renderTableHeading, renderTable} from "./lib/render.js"

const app = createApp(App);
app.mount("#app");

function initMap() {
  const map_container = document.createElement("div");
  map_container.setAttribute("id", "map");
  map_container.classList.add("map");

  document.querySelector("main").appendChild(map_container);
}

async function onMySearch(location) {
  try {
    var crd = location.coords;
    renderLoading();
    const weather_data = await weatherSearch(crd.latitude, crd.longitude);
    renderTableHeading({
      name: "",
      latitude: crd.latitude,
      longitude: crd.longitude,
    });
    renderTable(weather_data);

    initMap();
    createMap(crd.longitude, crd.latitude);
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

const search_form = document.querySelector(".search-form");
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
