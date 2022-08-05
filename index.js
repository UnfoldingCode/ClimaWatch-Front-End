let search_button = document.querySelector("#search_button");
let location_button = document.querySelector("#my_location");
let weather_info = document.querySelector("#weather_info");
let inputBox = document.querySelector("#city");

//****************************            Sign in Anchor Tab begining           *********************************/
let signinTab = document.querySelector("#sign_in");
let signinForm = document.querySelector("#signin_form");
let signin_username_input = document.querySelector("#user_name");
let signin_password_input = document.querySelector("#user_password");
let signin_btn_submit = document.querySelector("#signin_btn");
//****************************            Sign in   Anchor Tab End        *********************************/

//****************************            Join Now/Registration            *********************************/
let message_after_registration = document.querySelector(
  "#message_after_registration"
);
let joinNowTab = document.querySelector("#join_now");
let registrationForm = document.querySelector("#registartion_form");
let joinNow_username_input = document.querySelector("#username");
let joinNow_name_input = document.querySelector("#name");
let joinNow_email_input = document.querySelector("#email");
let joinNow_password_input = document.querySelector("#password");
let joinNow_btn_submit = document.querySelector("#registration_btn");
let joinNow_username;
let joinNow_name;
let joinNow_email;
let joinNow_password;
//****************************            Join Now/Registration            *********************************/

let api;

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
  registrationForm.style.display =
    registrationForm.style.display == "" ? "" : "";
  signinForm.style.display = signinForm.style.display == "" ? "" : "";
  message_after_registration.style.display =
    message_after_registration.style.display == "" ? "" : "";
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
  registrationForm.style.display =
    registrationForm.style.display == "" ? "" : "";
  signinForm.style.display = signinForm.style.display == "" ? "" : "";
  message_after_registration.style.display =
    message_after_registration.style.display == "" ? "" : "";
  let city = document.querySelector("#city").value;
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e572668bb21fee7042efec77137cc15c`;
});

search_button.addEventListener("click", fetch_weather);

async function fetch_weather() {
  try {
    weather_info.innerHTML = "";
    let res = await fetch(api);
    console.log(res);
    let data = await res.json();
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
    } else {
      let city_not_found = document.createElement("p");
      city_not_found.setAttribute("id", "city_not_found");
      city_not_found.innerText = `City not found !!!`;
      weather_info.appendChild(city_not_found);

      setTimeout(() => {
        weather_info.innerHTML = "";
      }, 5000);
    }
  } catch {}
}

//****************************            Join Now anchor tag            *********************************/

joinNowTab.addEventListener("click", () => {
  signinForm.style.display = signinForm.style.display == "" ? "" : "";
  message_after_registration.style.display =
    message_after_registration.style.display == "" ? "" : "";
  registrationForm.style.display =
    registrationForm.style.display == "" ? "block" : "";
  console.log("Join Now clicked");
});

//****************************            Sign in anchor tag            *********************************/
signinTab.addEventListener("click", () => {
  registrationForm.style.display =
    registrationForm.style.display == "" ? "" : "";
  message_after_registration.style.display =
    message_after_registration.style.display == "" ? "" : "";
  signinForm.style.display = signinForm.style.display == "" ? "block" : "";
  console.log("Sign in clicked");
});

//****************************     Join Now submit button ******** beginning           *********************************/

joinNow_btn_submit.addEventListener("click", (e) => {
  e.preventDefault();
  joinNow_username = joinNow_username_input.value.toLowerCase();
  joinNow_name = joinNow_name_input.value;
  joinNow_email = joinNow_email_input.value;
  joinNow_password = joinNow_password_input.value;
  console.log(joinNow_username, joinNow_name, joinNow_email, joinNow_password);
});

joinNow_btn_submit.addEventListener("click", user_registration);

async function user_registration() {
  let res = await fetch(`http://127.0.0.1:2022/users`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: joinNow_username,
      name: joinNow_name,
      email: joinNow_email,
      password: joinNow_password,
    }),
  });
  let data = await res.text();
  if (res.status == 200) {
    registrationForm.style.display =
      registrationForm.style.display == "" ? "" : "";
    message_after_registration.style.display = "block";
    message_after_registration.innerText = data;
    const inputs = document.querySelectorAll(
      "#username, #name, #email, #password"
    );
    inputs.forEach((input) => {
      input.value = "";
    });
    console.log(data);
  } else {
    registrationForm.style.display =
      registrationForm.style.display == "" ? "" : "";
    message_after_registration.style.display = "block";
    message_after_registration.innerText = data;
    const inputs = document.querySelectorAll(
      "#username, #name, #email, #password"
    );
    inputs.forEach((input) => {
      input.value = "";
    });
    console.log(data);
  }
}
//****************************      Join Now submit button   *******   end       *********************************/

//****************************     Sign in button grabbing username and value ******** beginning           *********************************/
signin_btn_submit.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Sign Button is clicked. Users is trying to sign in");
  signin_username_input = signin_username_input.value.toLowerCase();
  signin_password_input = signin_password_input.value;
  console.log(signin_username_input, signin_password_input);
});

//****************************     Sign in button grabbing username and value ******** end           *********************************/

//****************************     Function to send sign in post request to backend ******** beginning           *********************************/
async function sign_in_by_user() {
  let res = await fetch(`http://127.0.0.1:2022/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: signin_username_input,
      password: signin_password_input,
    }),
  });
}
