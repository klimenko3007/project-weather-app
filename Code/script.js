// All the DOMs are here
const selectCity = document.getElementById("select-city")
const containerIconTemp = document.getElementById("conteiner-icon-temp")
const minMaxTemp = document.getElementById("tempCelsius")
const sunSet = document.getElementById("sunSet")
const sunRise = document.getElementById("sunRise")
const container = document.getElementById("container")
const dayOne = document.getElementById("dayOne")
const currentDaySection = document.querySelector("#current-day-container")
const openingOfInfo = document.querySelectorAll(".day-forecast-container")
const allCities = document.querySelectorAll(".city-name")
const body = document.querySelector(".body")


// Global Variable
//const OurAPI = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Stockholm&cnt=10&appid=886705b4c1182eb1c69f28eb8c520e20&units=metric"
//http://api.openweathermap.org/data/2.5/forecast?q=Stockholm&units=metric&appid=3c8d0ca53cf60cf5802dc4c0325edd88

const sunrisePic = "./pics/sunrise.png"
const sunsetPic = "./pics/sunset.png"
const SthlmTemp = (userChoice) => {
  const cityAPI = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${userChoice}&cnt=10&appid=886705b4c1182eb1c69f28eb8c520e20&units=metric` 
  fetch(cityAPI).then((response) => {
        return response.json();
    }).then((json) => {
        //Timezone
        const TimeZone = json.city.timezone;
        const timezoneOffSet = new Date().getTimezoneOffset()*60;
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
        const maxTemperature = Math.round(json.list[0].temp.max)

        //Temperature
        const temperatureArrayDays =  Array.from(
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
        const nightTempArrayRounded = nightTempArray.map((element) =>{
          roundedTemp = Math.round(element);
          return roundedTemp;
        })
        //Night temperature Five Dyas
        const nightTempFiveDays = nightTempArrayRounded.filter((day, index)=>{
          return index > 0 && index < 6
        });

        //Day of the week
        const dateArray = Array.from(
          json.list, item => item.dt
      );
        const newDateArray = dateArray.map( (date) =>{
            const ourDate = new Date((date)*1000);
            const dateDateString = ourDate.toLocaleDateString('en-US', {
                weekday:'long',
            });
            return dateDateString
        });
        //Five days
        const dateFiveDays = newDateArray.filter ((date, index) => {
          return index > 0 && index < 6
        });
        //Date Current Day
        const dateCurrentDay = newDateArray[0];
        //Current weather
        const currentWeather = json.list[0].weather[0].main
        //Weather description
        const weatherDescriptionArray = Array.from(
          json.list, item => item.weather[0].description
        )
         
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
            return index >0 && index <6
            }
        )

      // Adding API information into HTML elements 
        containerIconTemp.innerHTML =`
          <div class="current-temp">
            <div>${tempertureCurrentDay}℃</div> 
            <div class="weather">${currentDayWeatherDescrition}</div>
            <div class="city-name">${json.city.name}</div>
          </div>
          <img class="current-icon" src="http://openweathermap.org/img/wn/${currentWeatherId}@2x.png"<img>`
        minMaxTemp.innerHTML = ` Min: ${minTemperature}℃</span><span> Max: ${maxTemperature}℃</span> ` // The weather icon will be changed depending on time and is affected by an function that will trigger and if else statement(its its cloudy === this picture etc.) 

    dateFiveDays.forEach((day, index) => {
        const temperature = temperatureFiveDays[index];
        const icon = fiveDaysId[index]
        const nightTemp = nightTempFiveDays[index];
        dayOne.innerHTML += `
        <dt class="forecast-line" >${day} <img src="http://openweathermap.org/img/wn/${icon}@2x.png" width="40px" > ${temperature}℃ / ${nightTemp}℃</dt>
        `
    })
    
    //Styling of the body color depending on the current weather

    if (tempertureCurrentDay <= 0 && tempertureCurrentDay >= -10) {
        body.style.background = "linear-gradient(0deg, rgba(34,92,195,1) 0%, rgba(162,200,210,1) 100%)"
    } else if (tempertureCurrentDay >0 && tempertureCurrentDay <= 10){
        body.style.background = "linear-gradient(0deg, rgba(34,188,195,1) 0%, rgba(195,209,213,1) 100%)"
    } else if (tempertureCurrentDay > 10 && tempertureCurrentDay <= 20){
        body.style.background = "linear-gradient(0deg, rgba(34,188,195,1) 0%, rgba(195,209,213,1) 100%)"
    }

    // allCities.forEach(cityName => {
    //   cityName.addEventListener('click', () => {
    //     cityName.classList.toggle('clicked')
    //     const info =cityName.nextElementSibling;
    //     if(cityName.classList.contains('clicked')) {
    //       info.style.height = info.scrollHeight + 'px';
    //     }
    //     else {
    //       info.style.height = '0';
    //     }
    // })
    // })
    })
}
SthlmTemp('Stockholm')
selectCity.addEventListener('change', () => {
  dayOne.innerHTML = '';
  SthlmTemp(selectCity.value)
}) 




