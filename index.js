url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e572668bb21fee7042efec77137cc15c`;

async function fetch_weather_api(url) {
  try {
    data = await fetch(url);
  } catch {}
}
