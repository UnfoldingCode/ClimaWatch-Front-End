let search_button = document.querySelector("#search_button");
let location_button = document.querySelector("#my_location");
let weather_info = document.querySelector("#weather_info");
let inputBox = document.querySelector("#city");
let joinNowTab = document.querySelector("#join_now");
let registrationForm = document.querySelector("#registartion_form");
let firstcolumn = document.querySelector('#card1');
let firstcard = document.querySelector('#card1');
let secondcard = document.querySelector('#card2');
let thirdcard = document.querySelector('#card3');
let secondcolumn = document.querySelector('#card2');
let thirdcolumn = document.querySelector('#card3');
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
    }
  } catch {}
}

window.addEventListener("load", fetch_news);

async function fetch_news() {
  firstcolumn.innerHTML="";
  secondcolumn.innerHTML="";
  thirdcolumn.innerHTML="";
  try {
    let re = await fetch(`https://newsdata.io/api/1/news?apikey=pub_9879923018ce89b9bb0bdf501694d53d3789&language=fr,en`);
    newsData = await re.json();
    if (re.status == 200) {
      let Image =[];
      let Title =[];
      let Descript =[];
      let links = [];
      for(let l=0;l<3;l++){
        if(newsData.results[l].image_url==null){
          Image.push("");
        }else{
          Image.push(newsData.results[l].image_url);
        }
        Title.push(newsData.results[l].title);
        Descript.push(newsData.results[l].description);
        links.push(newsData.results[l].link);
      }

      
      if(Image[0]==""){
        console.log("No First Column Image");
      }else{
        let pictureone = document.createElement("img");
        pictureone.setAttribute("src", `${Image[0]}`);
        firstcard.appendChild(pictureone);
      }

      if(Image[1]==""){
        console.log("No Second Column Image");
      }else{
        let picturetwo = document.createElement("img");
        picturetwo.setAttribute("src", `${Image[1]}`);
        secondcard.appendChild(picturetwo);
      }

      if(Image[2]==""){
        console.log("No Third Column Image");
      }else{
        let picturethree = document.createElement("img");
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

//****************************            Join Now anchor tag            *********************************/

joinNowTab.addEventListener("click", () => {
  registrationForm.style.display =
    registrationForm.style.display == "" ? "block" : "";
  console.log("Join Now clicked");
});
