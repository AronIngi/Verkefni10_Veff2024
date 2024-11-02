const api = "https://api.api-ninjas.com/v1/geocoding";
const key = "oKw7FGibRgxh8Hsn13+gtg==8thJxbkK2gWOB7O4";

function parseData(data) {
  const parsed = {
    name: data[0].name,
    latitude: data[0].latitude,
    longitude: data[0].longitude,
  };
  return parsed;
}

export async function citySearch(city) {
  const request_headers = new Headers();
  request_headers.append("X-Api-Key", key);

  const url = new URL(api);
  const query = new URLSearchParams({
    city: city,
  });
  url.search = query.toString();

  const request = new Request(url.href, { headers: request_headers });
  const response = await fetch(request);

  if (response.ok) {
    const data = await response.json();
    return parseData(data);
  }
}
