let search_button = document.querySelector("#search_button");
let api;

search_button.addEventListener("click", () => {
  let city = document.querySelector("#city").value;
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e572668bb21fee7042efec77137cc15c`;
});

search_button.addEventListener("click", fetch_weather);

async function fetch_weather() {
  try {
    let weather_info = document.querySelector("#weather_info");
    weather_info.innerHTML = "";
    let res = await fetch(api);
    console.log(res);
    let data = await res.json();
    if (res.status == 200) {
      let icon = data.weather[0].icon;
      let description = data.weather[0].description;
      let temp = data.main.temp;
      let feels_like = data.main.feels_like;
      let temp_min = data.main.temp_min;
      let temp_max = data.main.temp_max;

      if (data.weather[0].id == 800) {
        weather_info.setAttribute("class", "_800");
      } else if (data.weather[0].id >= 300 && data.weather[0].id <= 321) {
        weather_info.setAttribute("class", "_300S");
      } else if (data.weather[0].id >= 500 && data.weather[0].id <= 531) {
        weather_info.setAttribute("class", "_500S");
      } else if (data.weather[0].id >= 600 && data.weather[0].id <= 622) {
        weather_info.setAttribute("class", "_600S");
      } else {
        weather_info.setAttribute("class", "none");
      }
      let location = document.createElement("p");
      location.setAttribute("class", "tenpx");
      location.innerText = `${data.name}, ${data.sys.country}`;
      weather_info.appendChild(location);
      let weather_icon = document.createElement("img");
      weather_icon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${icon}@2x.png`
      );
      weather_info.appendChild(weather_icon);
      let weather_description = document.createElement("span");
      weather_description.setAttribute("class", "tenpx");
      weather_description.innerText = description;
      weather_info.appendChild(weather_description);
      let temp_current = document.createElement("span");
      temp_current.setAttribute("class", "tenpx");
      temp_current.innerText = `${temp}\u00B0c`;
      weather_info.appendChild(temp_current);
      let min_max = document.createElement("div");
      let realFeel = document.createElement("span");
      realFeel.setAttribute("class", "tenpx");
      realFeel.innerText = `Feels like ${feels_like}\u00B0c`;
      min_max.appendChild(realFeel);
      let minTemp = document.createElement("span");
      minTemp.setAttribute("class", "tenpx");
      minTemp.innerText = `Min Temperature: ${temp_min}\u00B0c`;
      min_max.appendChild(minTemp);
      let maxTemp = document.createElement("span");
      maxTemp.setAttribute("class", "tenpx");
      maxTemp.innerText = `Max Temperature: ${temp_max}\u00B0c`;
      min_max.appendChild(maxTemp);
      let humidity_ = document.createElement("span");
      humidity_.setAttribute("class", "tenpx");
      humidity_.innerText = `Humidity: ${data.main.humidity}%`;
      min_max.appendChild(humidity_);
      weather_info.appendChild(min_max);
    }
  } catch {}
}
