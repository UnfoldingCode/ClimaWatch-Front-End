let search_button = document.querySelector("#search_button");
let api;

search_button.addEventListener("click", () => {
  let city = document.querySelector("#city").value;
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e572668bb21fee7042efec77137cc15c`;
});

search_button.addEventListener("click", fetch_weather);

async function fetch_weather() {
  let res = await fetch(api);
  console.log(res);
  let data = await res.json();
  console.log(data.sys.country);
}
