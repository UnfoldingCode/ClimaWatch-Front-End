let search_button = document.querySelector("#search_button");
let location_button = document.querySelector("#my_location");
let weather_info = document.querySelector("#weather_info");
let inputBox = document.querySelector("#city");
let joinNowTab = document.querySelector("#join_now");
let registrationForm = document.querySelector("#registartion_form");
let api;
let data;
let newsApi;
//****************************            When hit Enter            *********************************/
inputBox.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
    console.log("ENTER");
    requestApi(inputBox.value);
  }
});

function requestApi(inputVal) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&units=metric&appid=e572668bb21fee7042efec77137cc15c
`;
  fetch_weather();
}

function requestNewsApi(inputCountry) {
  newsApi = `https://newsdata.io/api/1/news?apikey=pub_9879923018ce89b9bb0bdf501694d53d3789&country=${inputCountry}`;
  fetch_news();
}

//****************************            When hit Enter            *********************************/

//****************************            clock             *********************************/
function currentTime() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";

  if (hh === 0) {
    hh = 12;
  }
  if (hh > 12) {
    hh = hh - 12;
    session = "PM";
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  let time = hh + ":" + mm + ":" + ss + " " + session;

  document.getElementById("clock").innerText = time;
  let t = setTimeout(function () {
    currentTime();
  }, 1000);
}

currentTime();
//****************************            clock             *********************************/

//****** Using HTML Geolocation - The getCurrentPosition() method is used to return the user's position.    */
//***    https://www.w3schools.com/html/html5_geolocation.asp    */

location_button.addEventListener("click", () => {
  weather_info.innerHTML = "";
  document.querySelector("#city").value = "";
  displayLoading();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});


function showPosition(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=e572668bb21fee7042efec77137cc15c
`;
  fetch_weather();
  fetch_news();
}
//****** Using HTML Geolocation - The getCurrentPosition() method is used to return the user's position.    */

//********* Loader *************/

let loader = document.querySelector("#loading");

function displayLoading() {
  loader.classList.add("display");
  // to stop loading after some time
  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
  console.log("loader");
}

//hide loading
function hideLoading() {
  loader.classList.remove("display");
  console.log("unLoader");
}

//********* Loader *************/

search_button.addEventListener("click", () => {
  displayLoading();
  let city = document.querySelector("#city").value;
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e572668bb21fee7042efec77137cc15c`;
});

search_button.addEventListener("click", fetch_weather);

search_button.addEventListener("click", fetch_news);

async function fetch_weather() {
  try {
    weather_info.innerHTML = "";
    let res = await fetch(api);
    console.log(res);
    data = await res.json();
    hideLoading();
    document.querySelector("#city").value = "";
    if (res.status == 200) {
      let icon = data.weather[0].icon;
      let description = data.weather[0].description;
      let temp = data.main.temp;
      let feels_like = data.main.feels_like;
      let temp_min = data.main.temp_min;
      let temp_max = data.main.temp_max;

      if (data.weather[0].id == 800) {
        weather_info.setAttribute("class", "_800");
      } else if (data.weather[0].id >= 200 && data.weather[0].id <= 232) {
        weather_info.setAttribute("class", "_200S");
      } else if (data.weather[0].id >= 300 && data.weather[0].id <= 321) {
        weather_info.setAttribute("class", "_300S");
      } else if (data.weather[0].id >= 500 && data.weather[0].id <= 531) {
        weather_info.setAttribute("class", "_500S");
      } else if (data.weather[0].id >= 600 && data.weather[0].id <= 622) {
        weather_info.setAttribute("class", "_600S");
      } else if (data.weather[0].id >= 701 && data.weather[0].id <= 781) {
        weather_info.setAttribute("class", "_700S");
      } else if (data.weather[0].id >= 801 && data.weather[0].id <= 804) {
        weather_info.setAttribute("class", "_800S");
      } else {
        weather_info.setAttribute("class", "none");
      }
      let location = document.createElement("p");
      location.setAttribute("class", "tenpx");
      location.innerText = `${data.name}, ${data.sys.country}`;
      weather_info.appendChild(location);

      let weather_description = document.createElement("span");
      weather_description.setAttribute("class", "tenpx");
      weather_description.innerText = description;
      location.appendChild(weather_description);
      let temp_current = document.createElement("span");
      temp_current.setAttribute("class", "tenpx");
      temp_current.innerText = `${temp}\u00B0c`;
      location.appendChild(temp_current);

      let weather_icon = document.createElement("img");
      weather_icon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${icon}@2x.png`
      );
      weather_info.appendChild(weather_icon);
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

async function fetch_news() {
  try {
    let re = await fetch(`https://newsdata.io/api/1/news?apikey=pub_9879923018ce89b9bb0bdf501694d53d3789&country=${data.sys.country}`);
    console.log(re)
    newsData = await re.json();
    if (re.status == 200) {
      console.log(newsData.results[0])
      let Image =[];
      let Title =[];
      let Descript =[];
      for(let l=0;l<3;l++){
        Image.push(newsData.results[l].image_url);
        Title.push(newsData.results[l].title);
        Descript.push(newsData.results[l].description);
      }
      let firstcolumn = document.querySelector('#column1');
      let secondcolumn = document.querySelector('#column2');
      let thirdcolumn = document.querySelector('#column3');

      let pictureone = document.createElement("img");
      pictureone.setAttribute("src", `${Image[0]}`);
      firstcolumn.appendChild(pictureone);

      let picturetwo = document.createElement("img");
      picturetwo.setAttribute("src", `${Image[1]}`);
      secondcolumn.appendChild(picturetwo);

      let picturethree = document.createElement("img");
      picturethree.setAttribute("src", `${Image[2]}`);
      thirdcolumn.appendChild(picturethree);

      let newsTitleOne = document.createElement("h1");
      newsTitleOne.setAttribute("id", "title1");
      newsTitleOne.innerText = Title[0];
      firstcolumn.appendChild(newsTitleOne);

      let newsTitleTwo = document.createElement("h2");
      newsTitleTwo.setAttribute("id", "title2");
      newsTitleTwo.innerText = Title[1];
      secondcolumn.appendChild(newsTitleTwo);

      let newsTitleThree = document.createElement("h3");
      newsTitleThree.setAttribute("id", "title3");
      newsTitleThree.innerText = Title[2];
      thirdcolumn.appendChild(newsTitleThree);

      let newsDescriptionOne = document.createElement("p");
      newsDescriptionOne.setAttribute("class", "Desc1");
      newsDescriptionOne.innerText = Descript[0];
      firstcolumn.appendChild(newsDescriptionOne);

      let newsDescriptionTwo = document.createElement("p");
      newsDescriptionTwo.setAttribute("class", "Desc2");
      newsDescriptionTwo.innerText = Descript[1];
      secondcolumn.appendChild(newsDescriptionTwo);

      let newsDescriptionThree = document.createElement("p");
      newsDescriptionThree.setAttribute("class", "Desc3");
      newsDescriptionThree.innerText = Descript[2];
      thirdcolumn.appendChild(newsDescriptionThree);
    }
  } catch {}
}

//****************************            Join Now anchor tag            *********************************/

joinNowTab.addEventListener("click", () => {
  registrationForm.style.display =
    registrationForm.style.display == "" ? "block" : "";
  console.log("Join Now clicked");
});
