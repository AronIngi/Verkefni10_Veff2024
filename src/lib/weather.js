const API_URL = "https://api.open-meteo.com/v1/forecast";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @typedef {Object} Forecast
 * @property {string} time
 * @property {number} temperature
 * @property {number} precipitation
 */

/**
 * Tekur við gögnum frá Open Meteo og skilar fylki af spám í formi Forecast.
 * @param {unknown} data Gögn frá Open Meteo.
 * @returns {Array<Forecast>}
 */
function parseResponse(data) {
  const hours = [];
  for (const time of data.hourly.time) {
    const split = time.split("T");
    hours.push(split[1]);
  }
  const weather_data = {
    hourly: {
      precipitation: data.hourly.precipitation,
      temperature: data.hourly.temperature_2m,
      time: hours,
    },
    units: {
      precipitation: data.hourly_units.precipitation,
      temperature: data.hourly_units.temperature_2m,
    },
  };
  return weather_data;
}

/**
 * Framkvæmir leit að veðurspám fyrir gefna staðsetningu.
 * @param {number} lat
 * @param {number} lng
 * @returns {Promise<Array<Forecast>>} Fylki af spám fyrir staðsetningu.
 */
export async function weatherSearch(
  lat,
  lng,
  temp_unit = "celsius",
  prec_unit = "mm",
) {
  await sleep(1000);
  // Querystring sem við viljum senda með leit
  // latitude={lat}&longitude={lng}}&hourly=temperature_2m,precipitation&timezone=GMT&forecast_days=1

  // TODO útfæra
  // Hér ætti að nota URL og URLSearchParams
  const url = new URL(API_URL);
  const querystring = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lng.toString(),
    hourly: "temperature_2m,precipitation",
    forecast_days: "1",
    temperature_unit: temp_unit,
    precipitation_unit: prec_unit,
  });
  url.search = querystring.toString();

  const response = await fetch(url.href);

  if (response.ok) {
    const data = await response.json();

    return parseResponse(data);
  }
}
