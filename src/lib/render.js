import { el } from "./elements.js";

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

export function renderError(message) {
  const heading = document.querySelector(".table-heading");
  heading.innerHTML = message;
}

export function renderGeoError(error) {
  const heading = document.querySelector(".table-heading");
  heading.innerHTML = `Error ${error.code}: ${error.message}`;
}

export function renderLoading() {
  const heading = document.querySelector(".table-heading");
  heading.innerHTML = "Loading...";
}

export function renderTableHeading(data) {
  const text = `${data.name} ${data.latitude} ${data.longitude}`;

  document.querySelector(".table-heading").innerHTML = text;
}

export function renderTable(data) {

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

  renderIntoContainer(table);
}
