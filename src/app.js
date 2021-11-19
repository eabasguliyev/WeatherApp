const apiKey = "APIKEY";

// Select DOM elements

const generalAddress = document.querySelector(".general__address");
const generalIcon = document.querySelector(".general__icon");
const temperature = document.querySelector(".temperature");
const descriptionMain = document.querySelector(".description__main");
const descriptionDesc = document.querySelector(".description__desc");

descriptionDesc.style.display = "none";

export function run(coordinate) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.latitude}&lon=${coordinate.longitude}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((json) => {
      let { name } = json;
      let { main, description, icon } = json.weather[0];
      let { temp } = json.main;

      // Set weather values to dom elements.

      generalAddress.textContent = name;
      descriptionMain.textContent = main;
      descriptionDesc.textContent = description;

      changeTemperature(temperature, temp, "K");

      $(generalIcon).addClass("owi-" + icon);
      descriptionDesc.style.display = "initial";

      let counter = 0;

      temperature.addEventListener("click", () => {
        counter++;
        if (counter > 2) counter = 0;

        if (counter === 0) {
          changeTemperature(temperature, temp, "K");
        } else if (counter === 1) {
          changeTemperature(temperature, degreeConvert(temp, "K", "F"), "F");
        } else {
          changeTemperature(temperature, degreeConvert(temp, "K", "C"), "C");
        }
      });
    });
}

export function getCoordinate(callback) {
  navigator.geolocation.getCurrentPosition(function (position) {
    var coordinate = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    callback(coordinate);
  });
}

function degreeConvert(temp, from, to) {
  from = from.toUpperCase();
  to = to.toUpperCase();

  let convertedTemp = 0;
  if (from === "K") {
    if (to === "F") {
      convertedTemp = temp * (9 / 5) - 459.67;
    } else if (to === "C") {
      convertedTemp = temp - 273.15;
    } else throw new Error("Invalid degree type");
  } else throw new Error("Not implemented yet");

  return convertedTemp.toFixed(2);
}

function changeTemperature(element, temp, type) {
  element.childNodes[1].textContent = temp;
  element.childNodes[3].textContent = type;
}
