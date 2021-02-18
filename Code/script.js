// All the DOMs are here
const cityName = document.getElementById("city-name")
const tempCelsius = document.getElementById("tempCelsius")
const sunSet = document.getElementById("sunSet")
const sunRise = document.getElementById("sunRise")
const highlight = document.getElementById("highlight")
const container = document.getElementById("container")
const dayOne = document.getElementById("dayOne")
const currentDaySection = document.querySelector("#current-day-container")
const openingOfInfo = document.querySelectorAll(".day-forecast-container")
const allCities = document.querySelectorAll(".city-name")
const body = document.querySelector(".body")


// Global Variable
const OurAPI = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Stockholm&cnt=10&appid=886705b4c1182eb1c69f28eb8c520e20&units=metric"
//http://api.openweathermap.org/data/2.5/forecast?q=Stockholm&units=metric&appid=3c8d0ca53cf60cf5802dc4c0325edd88


const SthlmTemp = () => {
    fetch(OurAPI).then((response) => {
        return response.json();
    }).then((json) => {
        //Sunset time
        const unixSet = json.list[0].sunset;
        //Calculation to convert unix stamp to normal timezone
        const dateSet = new Date(unixSet*1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
  
        //Sunrise time
        const unixRise = json.list[0].sunrise;
        //Calculation to convert unix stamp to normal timezone
        const dateRise = new Date(unixRise*1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        
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
        console.log(temperatureFiveDays);
        //Temperature current day
        const tempertureCurrentDay = temperatureArrayDaysRounded[0];
        
        //Day of the week
        const dateArray = Array.from(
          json.list, item => item.dt
      );
        const newDateArray = dateArray.map( (date) =>{
            const launchDate = new Date((date)*1000);
            const dateDateString = launchDate.toLocaleDateString('en-US', {
                weekday:'short',
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
        highlight.innerHTML = ` ${currentDayWeatherDescrition} <img width="40px" src="http://openweathermap.org/img/wn/${currentWeatherId}@2x.png"<img>`
        cityName.innerHTML = `${json.city["name"]}`
        tempCelsius.innerHTML = `<span> ${tempertureCurrentDay}℃ Min: ${minTemperature}℃</span>  <span> Max: ${maxTemperature}℃</span> ` // The weather icon will be changed depending on time and is affected by an function that will trigger and if else statement(its its cloudy === this picture etc.)
        sunRise.innerHTML = `Sunrise: ${dateRise} AM `
        sunSet.innerHTML = `Sunset: ${dateSet} PM` 


    // for (let i = 0; i < dateFiveDays.length && i < temperatureFiveDays.length && i < fiveDaysId.length; i++) {
    //     dayOne.innerHTML += `<dt>${dateFiveDays[i]}: ${temperatureFiveDays[i]} <img src="http://openweathermap.org/img/wn/${fiveDaysId[i]}@2x.png" width="40px" > </dt>`
    // }
    dateFiveDays.forEach((day, index) => {
        const temperature = temperatureFiveDays[index];
        const icon = fiveDaysId[index]
        dayOne.innerHTML += `
        <dt class="forecast-line" >${day} <img src="http://openweathermap.org/img/wn/${icon}@2x.png" width="40px" > ${temperature}  </dt>
        `
    })
    
    //Styling of the body color depending on the current weather

    switch (currentWeather) {
      case 'Clouds': {
        body.style.backgroundImage = "url('')"
      }
        break;
      case 'Snow': {
        break;
      }
    }

    const accordionQuestion = document.querySelectorAll('.accordion-question');

    allCities.forEach(cityName => {
      cityName.addEventListener('click', () => {
        cityName.classList.toggle('clicked')
        const info =cityName.nextElementSibling;
        if(cityName.classList.contains('clicked')) {
          info.style.height = info.scrollHeight + 'px';
        }
        else {
          info.style.height = '0';
        }
    })
    })
    
    })
}

SthlmTemp()



