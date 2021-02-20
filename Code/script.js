// All the DOMs are here
const selectCity = document.getElementById("select-city");
const containerIconTemp = document.getElementById("conteiner-icon-temp");
const minMaxTemp = document.getElementById("tempCelsius");
const sunSet = document.getElementById("sunSet");
const sunRise = document.getElementById("sunRise");
const forecast = document.getElementById("forecast");
const body = document.querySelector(".body");
const cityContainer = document.querySelector(".city-container");

// Global Variable
const sunrisePic = "./pics/sunrise.png";
const sunsetPic = "./pics/sunset.png";
//Fetch function
const SthlmTemp = (userChoice) => {
  const cityAPI = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${userChoice}&cnt=10&appid=886705b4c1182eb1c69f28eb8c520e20&units=metric`;
  fetch(cityAPI).then((response) => {
    return response.json();
  }).then((json) => {
    //Timezone
    const TimeZone = json.city.timezone;
    const timezoneOffSet = new Date().getTimezoneOffset() * 60;
    //Sunrise time
    const sunRiseUnix = json.list[0].sunrise;
    const sunriseDate = new Date((sunRiseUnix + TimeZone + timezoneOffSet) * 1000);
    sunRise.innerHTML = sunriseDate.getHours() > 9 ? `<img src=${sunrisePic} width ="40px"> <span class="sun-class">Sunrise: ${sunriseDate.getHours()}:</span>` : `<img src=${sunrisePic} width ="40px"> <span class="sun-class"> Sunrise: 0${sunriseDate.getHours()}:</span>`;
    sunRise.innerHTML += sunriseDate.getMinutes() > 9 ? `<span class="sun-class">${sunriseDate.getMinutes()}</span>` : `<span class="sun-class">0${sunriseDate.getMinutes()}</span>`;

    //Sunset time
    const sunSetUnix = json.list[0].sunset;
    const sunsetDate = new Date((sunSetUnix + TimeZone + timezoneOffSet) * 1000);
    sunSet.innerHTML = sunsetDate.getHours() > 9 ? `<img src=${sunsetPic} width ="40px"><span class="sun-class">Sunset: ${sunsetDate.getHours()}:</span>` : `<img src=${sunsetPic} width ="40px"><span class="sun-class">Sunset: 0${sunsetDate.getHours()}:</span>`;
    sunSet.innerHTML += sunsetDate.getMinutes() > 9 ? `<span class="sun-class">${sunsetDate.getMinutes()}</span>` : `<span class="sun-class">0${sunsetDate.getMinutes()}</span>`;

    //Min and Max temperature
    const minTemperature = Math.round(json.list[0].temp.min);
    const maxTemperature = Math.round(json.list[0].temp.max);

    //Temperature
    const temperatureArrayDays = Array.from(
      json.list, item => item.temp.day
    );
    const temperatureArrayDaysRounded = temperatureArrayDays.map((element) => {
      const roundedTemp = Math.round(Number(element));
      return roundedTemp
    });
    //Temperature 5 days
    const temperatureFiveDays = temperatureArrayDaysRounded.filter((day, index) => {
      return index > 0 && index < 6
    });
    //Temperature current day
    const tempertureCurrentDay = temperatureArrayDaysRounded[0];

    //Night temperature

    const nightTempArray = Array.from(
      json.list, item => item.temp.night
    );
    const nightTempArrayRounded = nightTempArray.map((element) => {
      roundedTemp = Math.round(element);
      return roundedTemp;
    });
    //Night temperature Five Dyas
    const nightTempFiveDays = nightTempArrayRounded.filter((day, index) => {
      return index > 0 && index < 6
    });

    //Day of the week
    const dateArray = Array.from(
      json.list, item => item.dt
    );
    const newDateArray = dateArray.map((date) => {
      const ourDate = new Date((date) * 1000);
      const dateDateString = ourDate.toLocaleDateString('en-US', {
        weekday: 'long',
      });
      return dateDateString
    });
    //Five days
    const dateFiveDays = newDateArray.filter((date, index) => {
      return index > 0 && index < 6
    });
    //Date Current Day
    const dateCurrentDay = newDateArray[0];
    //Current weather
    const currentWeather = json.list[0].weather[0].main;
    //Weather description
    const weatherDescriptionArray = Array.from(
      json.list, item => item.weather[0].description
    );
    //Current day weather description
    const currentDayWeatherDescrition = weatherDescriptionArray[0]
    //Weather icon ID
    const weatherIdArray = Array.from(
      json.list, item => item.weather[0].icon
    );
    //Current Weather icon ID
    const currentWeatherId = weatherIdArray[0];
    //Weather Five dayes icon ID
    const fiveDaysId = weatherIdArray.filter((day, index) => {
      return index > 0 && index < 6
    });

    // Adding API information into HTML elements 
    containerIconTemp.innerHTML = `
          <div class="current-temp">
            <div>${tempertureCurrentDay}℃</div> 
            <div class="weather">${currentDayWeatherDescrition}</div>
            <div class="city-name">${json.city.name}</div>
          </div>
          <img class="current-icon" src="http://openweathermap.org/img/wn/${currentWeatherId}@2x.png"<img>`;
    minMaxTemp.innerHTML = ` Min: ${minTemperature}℃</span><span> Max: ${maxTemperature}℃</span> `;

    dateFiveDays.forEach((day, index) => {
      const temperature = temperatureFiveDays[index];
      const icon = fiveDaysId[index];
      const nightTemp = nightTempFiveDays[index];
      forecast.innerHTML += `
              <div class="forecast-line" > 
                <span class="five-text">${day}</span> 
                <img class="five-icon" src="http://openweathermap.org/img/wn/${icon}@2x.png" width="40px" > 
                <span class="five-text day">${temperature}℃</span>
                <span class="night">${nightTemp}℃ </span>
              </div>
            `;
    });

    //Styling of the body color depending on the current weather

    const currentWeatherBackground = json.list[0].weather[0].main;

    const changeBackgroundColor = (cityBackgound, selectBackground, bodyBackground) => {
      cityContainer.style.backgroundImage = `${cityBackgound}`;
      selectCity.style.backgroundColor = `${selectBackground}`;
      body.style.backgroundColor = `${bodyBackground}`;
    };

    const changeFontColor = (cityColor, forecastColor, selectColor) => {
      cityContainer.style.color = `${cityColor}`;
      forecast.style.color = `${forecastColor}`;
      selectCity.style.color = `${selectColor}`;
    };

    switch (currentWeatherBackground) {
      case 'Clouds': {
        changeBackgroundColor(
          "linear-gradient(#4e5f6e, #a3b1bc, #e8ecf2)",
          "#718291",
          "#718291"
        );
        changeFontColor("#1d252b", "white", "white");
        break;
      }
      case 'Rain': {
        changeBackgroundColor(
          "linear-gradient(#002e43, #406378, #8fa5b3)",
          "#637b8a",
          "#637b8a"
        );
        changeFontColor("white", "white", "white");
        break;
      };
      case 'Snow': {
        changeBackgroundColor(
          "linear-gradient(#144361, #6298BC, #87B2CC)",
          "#326585",
          "#326585"
        );
        changeFontColor("white", "white", "white");
        break;
      };
      case 'Thunderstorm': {
        changeBackgroundColor(
          "linear-gradient(#144182, #4776b9, #a7c5e8)",
          "#88afdd",
          "#88afdd"
        );
        changeFontColor("white", "#144182", "white");
        break;
      };
      case 'Drizzle': {
        changeBackgroundColor(
          "linear-gradient(#554853, #605c64, #a29a9d)",
          "#736871",
          "#736871"
        );
        changeFontColor("white", "white", "white");
        break;
      };
      case 'Clear': {
        changeBackgroundColor(
          "linear-gradient(#69545b, #9a6763, #f69358)",
          "#785f67",
          "#785f67"
        );
        changeFontColor("white", "white", "white");
        break;
      };
      default: {
        changeBackgroundColor(
          "linear-gradient(#766e3f, #a69e70, #b6b9a3)",
          "#5e5832",
          "#6e673a"
        );
        changeFontColor("white", "white", "white");
        break;
      };
    };
  });
};
//Entry point
SthlmTemp('Stockholm');
selectCity.addEventListener('change', () => {
  forecast.innerHTML = '';
  SthlmTemp(selectCity.value)
});




