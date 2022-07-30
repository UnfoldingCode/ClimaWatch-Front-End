let city = document.querySelector("#city");

let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e572668bb21fee7042efec77137cc15c`;
let search_button = document.querySelector("#search_button");
search_button.addEventListener("click", fetch_weather);

// async function fetch_weather_api(url) {
//   try {
//     data1 =
//     // data = await fetch(url);

//   } catch {}
// }

async function fetch_weather() {
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=kathmandu&units=metric&appid=e572668bb21fee7042efec77137cc15c`
  );
  console.log(city.value);

  console.log(res);
  let data = await res.json();
  console.log(data.sys.country);
}
