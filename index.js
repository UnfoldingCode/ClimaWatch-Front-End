let search_button = document.querySelector("#search_button");
search_button.addEventListener("click", fetch_weather);

async function fetch_weather() {
  let city = document.querySelector("#city").value;
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e572668bb21fee7042efec77137cc15c`
  );
  console.log(res);
  let data = await res.json();
  console.log(data.sys.country);
}
