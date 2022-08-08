let search_button = document.querySelector("#search_button");
let location_button = document.querySelector("#my_location");
let weather_info = document.querySelector("#weather_info");
let inputBox = document.querySelector("#city");
let log_out_tab = document.querySelector("#sign_out");
let user_info = document.querySelector("#user_info");
let user_logged_in; // to grab the name of the user
let api_news;
let country;

//***************************    NEWS ***********************/
let firstcolumn = document.querySelector("#card1");
let firstcard = document.querySelector("#card1");
let secondcard = document.querySelector("#card2");
let thirdcard = document.querySelector("#card3");
let secondcolumn = document.querySelector("#card2");
let thirdcolumn = document.querySelector("#card3");
window.addEventListener("load", fetch_news);

//****************************            Sign in Anchor Tab start           *********************************/
let signinTab = document.querySelector("#sign_in");
let signinForm = document.querySelector("#signin_form");
let signin_username_input = document.querySelector("#user_name");
let signin_password_input = document.querySelector("#user_password");
let signin_btn_submit = document.querySelector("#signin_btn");
//****************************            Sign in   Anchor Tab End        *********************************/

//****************************            Join Now/Registration     Start       *********************************/
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
//****************************            Join Now/Registration   End         *********************************/

//******************************** if user is logged in  start ***************************
let logged_name = localStorage.getItem("name");
window.addEventListener("load", () => {
  if (logged_name) {
    get_location();
    let location_table = document.querySelector("#table");
    location_table.style.display = "block";
    joinNowTab.style.display = "none";
    signinTab.style.display = "none";
    signinForm.reset();
    signinForm.style.display = "none";
    log_out_tab.style.display = "inline";
    user_logged_in = localStorage.getItem("name");
    user_info.innerHTML = `${user_logged_in}, Welcome to ClimaWatch !!! `;
  }

  async function get_location() {
    let t_body = document.querySelector("#t_body");
    t_body.innerHTML = "";

    let res = await fetch(
      `http://127.0.0.1:2022/locations/${localStorage.getItem("username")}`,
      {
        credentials: "include",
        method: "GET",
      }
    );
    let data = await res.json();
    if (res.status == 200) {
      locations_array = data["locations"];
      let city_array = [];
      for (elm of locations_array) {
        city_array.push(elm[2]);
      }
      console.log(city_array);
      // let t_body = document.querySelector("#t_body");

      for (let i = 0; i < city_array.length; i++) {
        api = `https://api.openweathermap.org/data/2.5/weather?q=${city_array[i]}&units=metric&appid=e572668bb21fee7042efec77137cc15c`;
        send_api_request(api);
        async function send_api_request(api) {
          let res = await fetch(api);
          let data = await res.json();
          if (res.status == 200) {
            let t_row = document.createElement("tr");

            let fav_location = document.createElement("td");
            fav_location.innerText = `${data.name}, ${data.sys.country}`;
            t_row.appendChild(fav_location);

            let descrip = document.createElement("td");
            descrip.innerText = data.weather[0].description;
            t_row.appendChild(descrip);

            let temp = document.createElement("td");
            temp.innerText = `${data.main.temp}\u00B0c`;
            t_row.appendChild(temp);

            let feels = document.createElement("td");
            feels.innerText = `${data.main.feels_like}\u00B0c`;
            t_row.appendChild(feels);

            let min_temp = document.createElement("td");
            min_temp.innerText = `${data.main.temp_min}\u00B0c`;
            t_row.appendChild(min_temp);

            let max_temp = document.createElement("td");
            max_temp.innerText = `${data.main.temp_max}\u00B0c`;
            t_row.appendChild(max_temp);

            let humidity = document.createElement("td");
            humidity.innerText = `${data.main.humidity}%`;
            t_row.appendChild(humidity);

            let remove_fav = document.createElement("td");
            let remove_btn = document.createElement("button");
            remove_btn.setAttribute("type", "button");
            remove_btn.setAttribute("id", `${data.name}, ${data.sys.country}`);
            remove_btn.innerText = "Remove Favorite";
            remove_fav.appendChild(remove_btn);
            t_row.appendChild(remove_fav);

            remove_btn.addEventListener("click", async (e) => {
              e.preventDefault();
              console.log(`${data.name}, ${data.sys.country}`);
              let res = await fetch(
                `http://127.0.0.1:2022/locations/${localStorage.getItem(
                  "username"
                )}`,
                {
                  credentials: "include",
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    location: `${data.name}, ${data.sys.country}`,
                  }),
                }
              );
              // let data = await res.text();
              if (res.status == 200) {
                let data = await res.text();
                t_row.style.display = "none";
                console.log(data);
              } else {
                let data = await res.json();
                console.log(data);
              }
            });

            t_body.appendChild(t_row);
          }
        }
      }
    }
  }
});

//******************************** if user is logged in end ***************************

let api;

//****************************            When hit Enter       Start     *********************************/
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
//****************************            When hit Enter        End    *********************************/

//****************************            clock         Start    *********************************/
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
//****************************            clock          End   *********************************/

//****** Using HTML Geolocation - The getCurrentPosition() method is used to return the user's position.    Start */
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
//****** Using HTML Geolocation - The getCurrentPosition() method is used to return the user's position.  End   */

//********* Loader    Start *************/

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

//********* Loader        End  *************/

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
      country = data.sys.country;
      api_news = `https://newsdata.io/api/1/news?apikey=pub_9879923018ce89b9bb0bdf501694d53d3789&country=${country}`;
      fetch_news_city();
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
      let location = document.createElement("span");
      location.setAttribute("class", "tenpx");
      location.innerText = `${data.name}, ${data.sys.country}`;
      let city = location.innerText;
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

      let realFeel = document.createElement("span");
      realFeel.setAttribute("class", "tenpx");
      realFeel.innerText = `Feels like ${feels_like}\u00B0c`;
      weather_info.appendChild(realFeel);

      // let min_max = document.createElement("span");
      let minTemp = document.createElement("span");
      minTemp.setAttribute("class", "tenpx");
      minTemp.innerText = `Min Temp: ${temp_min}\u00B0c`;
      weather_info.appendChild(minTemp);

      let maxTemp = document.createElement("span");
      maxTemp.setAttribute("class", "tenpx");
      maxTemp.innerText = `Max Temp: ${temp_max}\u00B0c`;
      weather_info.appendChild(maxTemp);

      let humidity_ = document.createElement("span");
      humidity_.setAttribute("class", "tenpx");
      humidity_.innerText = `Humidity: ${data.main.humidity}%`;
      weather_info.appendChild(humidity_);

      // weather_info.appendChild(min_max);
      if (localStorage.getItem("username")) {
        // ******************************** when user is logged in - it will display add to favorite button *************************************/
        let add_to_fav = document.createElement("span");
        let add_to_fav_btn = document.createElement("button");
        add_to_fav_btn.innerText = "Add to Favorite Location";
        add_to_fav.setAttribute("type", "button");
        add_to_fav.setAttribute("id", "add_to_fav_btn");
        add_to_fav.appendChild(add_to_fav_btn);
        weather_info.appendChild(add_to_fav);
        add_to_fav_btn.addEventListener("click", () => {
          city = `${data.name}, ${data.sys.country}`;
          // api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e572668bb21fee7042efec77137cc15c`;
          console.log(`Hey you have added ${city} into your favorite list`);
          let location_table = document.querySelector("#table");
          location_table.style.display = "block";
        });
        console.log(city);

        add_to_fav_btn.addEventListener("click", add_location);
        // add_to_fav_btn.addEventListener("click", get_location);

        async function add_location() {
          let res = await fetch(
            `http://127.0.0.1:2022/locations/${localStorage.getItem(
              "username"
            )}`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                location: city,
              }),
            }
          );
          let data = await res.text();
          if (res.status == 200) {
            console.log(data);
            get_location();
          } else {
            console.log(data);
            get_location();
          }
        }

        async function get_location() {
          let t_body = document.querySelector("#t_body");
          t_body.innerHTML = "";

          let res = await fetch(
            `http://127.0.0.1:2022/locations/${localStorage.getItem(
              "username"
            )}`,
            {
              credentials: "include",
              method: "GET",
            }
          );
          let data = await res.json();
          if (res.status == 200) {
            locations_array = data["locations"];
            let city_array = [];
            for (elm of locations_array) {
              city_array.push(elm[2]);
            }
            console.log(city_array);
            // let t_body = document.querySelector("#t_body");

            for (let i = 0; i < city_array.length; i++) {
              api = `https://api.openweathermap.org/data/2.5/weather?q=${city_array[i]}&units=metric&appid=e572668bb21fee7042efec77137cc15c`;
              send_api_request(api);
              async function send_api_request(api) {
                let res = await fetch(api);
                let data = await res.json();
                if (res.status == 200) {
                  let t_row = document.createElement("tr");

                  let fav_location = document.createElement("td");
                  fav_location.innerText = `${data.name}, ${data.sys.country}`;
                  t_row.appendChild(fav_location);

                  let descrip = document.createElement("td");
                  descrip.innerText = data.weather[0].description;
                  t_row.appendChild(descrip);

                  let temp = document.createElement("td");
                  temp.innerText = `${data.main.temp}\u00B0c`;
                  t_row.appendChild(temp);

                  let feels = document.createElement("td");
                  feels.innerText = `${data.main.feels_like}\u00B0c`;
                  t_row.appendChild(feels);

                  let min_temp = document.createElement("td");
                  min_temp.innerText = `${data.main.temp_min}\u00B0c`;
                  t_row.appendChild(min_temp);

                  let max_temp = document.createElement("td");
                  max_temp.innerText = `${data.main.temp_max}\u00B0c`;
                  t_row.appendChild(max_temp);

                  let humidity = document.createElement("td");
                  humidity.innerText = `${data.main.humidity}%`;
                  t_row.appendChild(humidity);

                  let remove_fav = document.createElement("td");
                  let remove_btn = document.createElement("button");
                  remove_btn.setAttribute("type", "button");
                  remove_btn.setAttribute(
                    "id",
                    `${data.name}, ${data.sys.country}`
                  );
                  remove_btn.innerText = "Remove Favorite";
                  remove_fav.appendChild(remove_btn);
                  t_row.appendChild(remove_fav);

                  remove_btn.addEventListener("click", async (e) => {
                    e.preventDefault();
                    console.log(`${data.name}, ${data.sys.country}`);
                    let res = await fetch(
                      `http://127.0.0.1:2022/locations/${localStorage.getItem(
                        "username"
                      )}`,
                      {
                        credentials: "include",
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          location: `${data.name}, ${data.sys.country}`,
                        }),
                      }
                    );
                    // let data = await res.text();
                    if (res.status == 200) {
                      let data = await res.text();
                      t_row.style.display = "none";
                      console.log(data);
                    } else {
                      let data = await res.json();
                      console.log(data);
                    }
                  });

                  t_body.appendChild(t_row);
                }
              }
            }
          }
        }
      }
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

//****************************     Join Now submit button ******** Start           *********************************/

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

//****************************     Sign in button sending fetch request ******** start           *********************************/
signin_btn_submit.addEventListener("click", sign_in_by_user);

//****************************     Sign in button sending fetch request ******** end           *********************************/

//****************************     Function to send sign in post request to backend ******** start           *********************************/
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
  let data = await res.json();
  let name = data["users"][0]["name"];
  let user_name = data["users"][0]["username"];
  console.log(`${name} logged in`);
  if (res.status == 200) {
    localStorage.setItem("name", name);
    localStorage.setItem("username", user_name);

    user_logged_in = localStorage.getItem("username");
    console.log(user_logged_in);
    if (user_logged_in) {
      joinNowTab.style.display = "none";
      signinTab.style.display = "none";
      signinForm.reset();
      signinForm.style.display = "none";
      log_out_tab.style.display = "inline";
      user_info.innerHTML = `${user_logged_in}, Welcome to ClimaWatch !!! `;
      let location_table = document.querySelector("#table");
      location_table.style.display = "block";
      get_location();
      async function get_location() {
        let t_body = document.querySelector("#t_body");
        t_body.innerHTML = "";

        let res = await fetch(
          `http://127.0.0.1:2022/locations/${localStorage.getItem("username")}`,
          {
            credentials: "include",
            method: "GET",
          }
        );
        let data = await res.json();
        if (res.status == 200) {
          locations_array = data["locations"];
          let city_array = [];
          for (elm of locations_array) {
            city_array.push(elm[2]);
          }
          console.log(city_array);
          // let t_body = document.querySelector("#t_body");

          for (let i = 0; i < city_array.length; i++) {
            api = `https://api.openweathermap.org/data/2.5/weather?q=${city_array[i]}&units=metric&appid=e572668bb21fee7042efec77137cc15c`;
            send_api_request(api);
            async function send_api_request(api) {
              let res = await fetch(api);
              let data = await res.json();
              if (res.status == 200) {
                let t_row = document.createElement("tr");

                let fav_location = document.createElement("td");
                fav_location.innerText = `${data.name}, ${data.sys.country}`;
                t_row.appendChild(fav_location);

                let descrip = document.createElement("td");
                descrip.innerText = data.weather[0].description;
                t_row.appendChild(descrip);

                let temp = document.createElement("td");
                temp.innerText = `${data.main.temp}\u00B0c`;
                t_row.appendChild(temp);

                let feels = document.createElement("td");
                feels.innerText = `${data.main.feels_like}\u00B0c`;
                t_row.appendChild(feels);

                let min_temp = document.createElement("td");
                min_temp.innerText = `${data.main.temp_min}\u00B0c`;
                t_row.appendChild(min_temp);

                let max_temp = document.createElement("td");
                max_temp.innerText = `${data.main.temp_max}\u00B0c`;
                t_row.appendChild(max_temp);

                let humidity = document.createElement("td");
                humidity.innerText = `${data.main.humidity}%`;
                t_row.appendChild(humidity);

                let remove_fav = document.createElement("td");
                let remove_btn = document.createElement("button");
                remove_btn.setAttribute("type", "button");
                remove_btn.setAttribute(
                  "id",
                  `${data.name}, ${data.sys.country}`
                );
                remove_btn.innerText = "Remove Favorite";
                remove_fav.appendChild(remove_btn);
                t_row.appendChild(remove_fav);

                remove_btn.addEventListener("click", async (e) => {
                  e.preventDefault();
                  console.log(`${data.name}, ${data.sys.country}`);
                  let res = await fetch(
                    `http://127.0.0.1:2022/locations/${localStorage.getItem(
                      "username"
                    )}`,
                    {
                      credentials: "include",
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        location: `${data.name}, ${data.sys.country}`,
                      }),
                    }
                  );
                  // let data = await res.text();
                  if (res.status == 200) {
                    let data = await res.text();
                    t_row.style.display = "none";
                    console.log(data);
                  } else {
                    let data = await res.json();
                    console.log(data);
                  }
                });

                t_body.appendChild(t_row);
              }
            }
          }
        }
      }
    }
  }
  // let unfav_btn = document.getElementById(`#${data.name}, ${data.sys.country}`);

  // unfav_btn.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   console.log(`${data.name}, ${data.sys.country}`);
  // });
}
//****************************     Function to send sign in post request to backend ******** end           *********************************/

//****************************     Function to send logout request to backend ******** start           *********************************/

async function logout() {
  let res = await fetch(`http://127.0.0.1:2022/logout`, {
    method: "POST",
  });
  let data = await res.json();
  let message = data["message"];
  if (res.status == 200) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "./index.html";
  }
}

//****************************     Function to send logout request to backend ******** end           *********************************/

//****************************     Logout tab event listener ******** start           *********************************/

log_out_tab.addEventListener("click", logout);

//****************************     Logout tab event listener ******** end           *********************************/

// *************************** News API Call *********************

// location_button.addEventListener("click", fetch_news_city);

// search_button.addEventListener("click", fetch_news_city);

async function fetch_news() {
  firstcolumn.innerHTML = "";
  secondcolumn.innerHTML = "";
  thirdcolumn.innerHTML = "";
  try {
    let re = await fetch(
      `https://newsdata.io/api/1/news?apikey=pub_9879923018ce89b9bb0bdf501694d53d3789&language=en`
    );
    newsData = await re.json();
    if (re.status == 200) {
      let Image = [];
      let Title = [];
      let Descript = [];
      let links = [];
      for (let l = 0; l < 3; l++) {
        if (newsData.results[l].image_url == null) {
          Image.push("");
        } else {
          Image.push(newsData.results[l].image_url);
        }
        Title.push(newsData.results[l].title);
        Descript.push(newsData.results[l].description);
        links.push(newsData.results[l].link);
      }

      if (Image[0] == "") {
        console.log("No First Column Image");
      } else {
        let pictureone = document.createElement("img");
        pictureone.setAttribute("class", "img-card");
        pictureone.setAttribute("src", `${Image[0]}`);
        firstcard.appendChild(pictureone);
      }

      if (Image[1] == "") {
        console.log("No Second Column Image");
      } else {
        let picturetwo = document.createElement("img");
        picturetwo.setAttribute("class", "img-card");
        picturetwo.setAttribute("src", `${Image[1]}`);
        secondcard.appendChild(picturetwo);
      }

      if (Image[2] == "") {
        console.log("No Third Column Image");
      } else {
        let picturethree = document.createElement("img");
        picturethree.setAttribute("class", "img-card");
        picturethree.setAttribute("src", `${Image[2]}`);
        thirdcard.appendChild(picturethree);
      }

      let titleDivOne = document.createElement("div");
      titleDivOne.setAttribute("class", "card-content");
      let newsTitleOne = document.createElement("h4");
      newsTitleOne.setAttribute("class", "card-title");
      newsTitleOne.innerText = Title[0];
      titleDivOne.appendChild(newsTitleOne);

      let titleDivTwo = document.createElement("div");
      titleDivTwo.setAttribute("class", "card-content");
      let newsTitleTwo = document.createElement("h4");
      newsTitleTwo.setAttribute("class", "card-title");
      newsTitleTwo.innerText = Title[1];
      titleDivTwo.appendChild(newsTitleTwo);

      let titleDivThree = document.createElement("div");
      titleDivThree.setAttribute("class", "card-content");
      let newsTitleThree = document.createElement("h4");
      newsTitleThree.setAttribute("class", "card-title");
      newsTitleThree.innerText = Title[2];
      titleDivThree.appendChild(newsTitleThree);

      let descDivOne = document.createElement("div");
      descDivOne.setAttribute("class", "card-content");
      let newsDescriptionOne = document.createElement("p");
      newsDescriptionOne.setAttribute("class", "Desc1");
      newsDescriptionOne.innerText = Descript[0];
      titleDivOne.appendChild(newsDescriptionOne);
      firstcolumn.appendChild(titleDivOne);

      let descDivTwo = document.createElement("div");
      descDivTwo.setAttribute("class", "card-content");
      let newsDescriptionTwo = document.createElement("p");
      newsDescriptionTwo.setAttribute("class", "Desc2");
      newsDescriptionTwo.innerText = Descript[1];
      titleDivTwo.appendChild(newsDescriptionTwo);
      secondcolumn.appendChild(titleDivTwo);

      let descDivThree = document.createElement("div");
      descDivThree.setAttribute("class", "card-content");
      let newsDescriptionThree = document.createElement("p");
      newsDescriptionThree.setAttribute("class", "Desc3");
      newsDescriptionThree.innerText = Descript[2];
      titleDivThree.appendChild(newsDescriptionThree);
      thirdcolumn.appendChild(titleDivThree);

      let readMoreDivtt = document.createElement("div");
      readMoreDivtt.setAttribute("class", "card-content");
      let readMoreOne = document.createElement("a");
      readMoreDivtt.setAttribute("class", "card-read-more");
      readMoreOne.setAttribute("href", `${links[0]}`);
      readMoreOne.setAttribute("target", "_blank");
      readMoreOne.innerText = "Read-More";
      readMoreDivtt.appendChild(readMoreOne);
      firstcolumn.appendChild(readMoreDivtt);

      let readMoreDivt = document.createElement("div");
      readMoreDivt.setAttribute("class", "card-content");
      let readMoreTwo = document.createElement("a");
      readMoreDivt.setAttribute("class", "card-read-more");
      readMoreTwo.setAttribute("href", `${links[1]}`);
      readMoreTwo.setAttribute("target", "_blank");
      readMoreTwo.innerText = "Read-More";
      readMoreDivt.appendChild(readMoreTwo);
      secondcolumn.appendChild(readMoreDivt);

      let readMoreDivo = document.createElement("div");
      readMoreDivo.setAttribute("class", "card-content");
      let readMoreThree = document.createElement("a");
      readMoreDivo.setAttribute("class", "card-read-more");
      readMoreThree.setAttribute("href", `${links[2]}`);
      readMoreThree.setAttribute("target", "_blank");
      readMoreThree.innerText = "Read-More";
      readMoreDivo.appendChild(readMoreThree);
      thirdcolumn.appendChild(readMoreDivo);
    }
  } catch {}
}

async function fetch_news_city() {
  firstcolumn.innerHTML = "";
  secondcolumn.innerHTML = "";
  thirdcolumn.innerHTML = "";
  try {
    let re = await fetch(
      `https://newsdata.io/api/1/news?apikey=pub_9879923018ce89b9bb0bdf501694d53d3789&country=${country}`
    );
    newsData = await re.json();
    if (re.status == 200) {
      let Image = [];
      let Title = [];
      let Descript = [];
      let links = [];
      for (let l = 0; l < 3; l++) {
        if (newsData.results[l].image_url == null) {
          Image.push("");
        } else {
          Image.push(newsData.results[l].image_url);
        }
        Title.push(newsData.results[l].title);
        Descript.push(newsData.results[l].description);
        links.push(newsData.results[l].link);
      }

      if (Image[0] == "") {
        console.log("No First Column Image");
      } else {
        let pictureone = document.createElement("img");
        pictureone.setAttribute("class", "img-card");
        pictureone.setAttribute("src", `${Image[0]}`);
        firstcard.appendChild(pictureone);
      }

      if (Image[1] == "") {
        console.log("No Second Column Image");
      } else {
        let picturetwo = document.createElement("img");
        picturetwo.setAttribute("class", "img-card");
        picturetwo.setAttribute("src", `${Image[1]}`);
        secondcard.appendChild(picturetwo);
      }

      if (Image[2] == "") {
        console.log("No Third Column Image");
      } else {
        let picturethree = document.createElement("img");
        picturethree.setAttribute("class", "img-card");
        picturethree.setAttribute("src", `${Image[2]}`);
        thirdcard.appendChild(picturethree);
      }

      let titleDivOne = document.createElement("div");
      titleDivOne.setAttribute("class", "card-content");
      let newsTitleOne = document.createElement("h4");
      newsTitleOne.setAttribute("class", "card-title");
      newsTitleOne.innerText = Title[0];
      titleDivOne.appendChild(newsTitleOne);

      let titleDivTwo = document.createElement("div");
      titleDivTwo.setAttribute("class", "card-content");
      let newsTitleTwo = document.createElement("h4");
      newsTitleTwo.setAttribute("class", "card-title");
      newsTitleTwo.innerText = Title[1];
      titleDivTwo.appendChild(newsTitleTwo);

      let titleDivThree = document.createElement("div");
      titleDivThree.setAttribute("class", "card-content");
      let newsTitleThree = document.createElement("h4");
      newsTitleThree.setAttribute("class", "card-title");
      newsTitleThree.innerText = Title[2];
      titleDivThree.appendChild(newsTitleThree);

      let descDivOne = document.createElement("div");
      descDivOne.setAttribute("class", "card-content");
      let newsDescriptionOne = document.createElement("p");
      newsDescriptionOne.setAttribute("class", "Desc1");
      newsDescriptionOne.innerText = Descript[0];
      titleDivOne.appendChild(newsDescriptionOne);
      firstcolumn.appendChild(titleDivOne);

      let descDivTwo = document.createElement("div");
      descDivTwo.setAttribute("class", "card-content");
      let newsDescriptionTwo = document.createElement("p");
      newsDescriptionTwo.setAttribute("class", "Desc2");
      newsDescriptionTwo.innerText = Descript[1];
      titleDivTwo.appendChild(newsDescriptionTwo);
      secondcolumn.appendChild(titleDivTwo);

      let descDivThree = document.createElement("div");
      descDivThree.setAttribute("class", "card-content");
      let newsDescriptionThree = document.createElement("p");
      newsDescriptionThree.setAttribute("class", "Desc3");
      newsDescriptionThree.innerText = Descript[2];
      titleDivThree.appendChild(newsDescriptionThree);
      thirdcolumn.appendChild(titleDivThree);

      let readMoreDivtt = document.createElement("div");
      readMoreDivtt.setAttribute("class", "card-content");
      let readMoreOne = document.createElement("a");
      readMoreDivtt.setAttribute("class", "card-read-more");
      readMoreOne.setAttribute("href", `${links[0]}`);
      readMoreOne.setAttribute("target", "_blank");
      readMoreOne.innerText = "Read-More";
      readMoreDivtt.appendChild(readMoreOne);
      firstcolumn.appendChild(readMoreDivtt);

      let readMoreDivt = document.createElement("div");
      readMoreDivt.setAttribute("class", "card-content");
      let readMoreTwo = document.createElement("a");
      readMoreDivt.setAttribute("class", "card-read-more");
      readMoreTwo.setAttribute("href", `${links[1]}`);
      readMoreTwo.setAttribute("target", "_blank");
      readMoreTwo.innerText = "Read-More";
      readMoreDivt.appendChild(readMoreTwo);
      secondcolumn.appendChild(readMoreDivt);

      let readMoreDivo = document.createElement("div");
      readMoreDivo.setAttribute("class", "card-content");
      let readMoreThree = document.createElement("a");
      readMoreDivo.setAttribute("class", "card-read-more");
      readMoreThree.setAttribute("href", `${links[2]}`);
      readMoreThree.setAttribute("target", "_blank");
      readMoreThree.innerText = "Read-More";
      readMoreDivo.appendChild(readMoreThree);
      thirdcolumn.appendChild(readMoreDivo);
    }
  } catch {}
}
