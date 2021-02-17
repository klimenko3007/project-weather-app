// All the DOMs are here
const cityName = document.getElementById("cityName")
const tempCelsius = document.getElementById("tempCelsius")
const sunSet = document.getElementById("sunSet")
const sunRise = document.getElementById("sunRise")
const highlight = document.getElementById("highlight")
const container = document.getElementById("container")
const dayOne = document.getElementById("dayOne")
const dayTwo = document.getElementById("dayTwo")
const dayThree = document.getElementById("dayThree")
const dayFour = document.getElementById("dayFour")
const dayFive = document.getElementById("dayFive")


// TO do = Find how you can get access to the upcoming 5 days weather forecast. 
// Global Variable
const OurAPI = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Stockholm&cnt=10&appid=886705b4c1182eb1c69f28eb8c520e20&units=metric"
//http://api.openweathermap.org/data/2.5/forecast?q=Stockholm&units=metric&appid=3c8d0ca53cf60cf5802dc4c0325edd88

// Global Variable

const WEATHER_ICONS = [
  {
    id: 200,
    link: 'http://openweathermap.org/img/wn/11d@2x.png'
  },
  {
    id: 201,
    link: 'http://openweathermap.org/img/wn/11d@2x.png'
  },
  {
    id: 202,
    link: 'http://openweathermap.org/img/wn/11d@2x.png'
  },
  {
    id: 210,
    link: 'http://openweathermap.org/img/wn/11d@2x.png'
  },
  {
    id: 211,
    link: 'http://openweathermap.org/img/wn/11d@2x.png'
  },
  {
    id: 212,
    link: 'http://openweathermap.org/img/wn/11d@2x.png'
  },
  {
    id: 221,
    link: 'http://openweathermap.org/img/wn/11d@2x.png'
  },
  {
    id: 230,
    link: 'http://openweathermap.org/img/wn/11d@2x.png'
  },
  {
    id: 231,
    link: 'http://openweathermap.org/img/wn/11d@2x.png'
  },
  {
    id: 232,
    link: 'http://openweathermap.org/img/wn/11d@2x.png'
  },
  {
    id: 300,
    link: 'http://openweathermap.org/img/wn/09d@2x.png'
  },
  {
    id: 301,
    link: 'http://openweathermap.org/img/wn/09d@2x.png'
  },{
    id: 302,
    link: 'http://openweathermap.org/img/wn/09d@2x.png'
  },{
    id: 310,
    link: 'http://openweathermap.org/img/wn/09d@2x.png'
  },{
    id: 311,
    link: 'http://openweathermap.org/img/wn/09d@2x.png'
  },{
    id: 312,
    link: 'http://openweathermap.org/img/wn/09d@2x.png'
  },{
    id: 313,
    link: 'http://openweathermap.org/img/wn/09d@2x.png'
  },
  {
    id: 314,
    link: 'http://openweathermap.org/img/wn/09d@2x.png'
  },
  {
    id: 321,
    link: 'http://openweathermap.org/img/wn/09d@2x.png'
  },
  {
    id: 500,
    link: 'http://openweathermap.org/img/wn/10d@2x.png'
  },
  {
    id: 501,
    link: 'http://openweathermap.org/img/wn/10d@2x.png'
  },
  {
    id: 502,
    link: 'http://openweathermap.org/img/wn/10d@2x.png'
  },
  {
    id: 503,
    link: 'http://openweathermap.org/img/wn/10d@2x.png'
  },
  {
    id: 504,
    link: 'http://openweathermap.org/img/wn/10d@2x.png'
  },
  {
    id: 511,
    link: 'http://openweathermap.org/img/wn/13d@2x.png'
  },
  {
    id: 520,
    link: 'http://openweathermap.org/img/wn/09d@2x.png'
  },
  {
    id: 521,
    link: 'http://openweathermap.org/img/wn/09d@2x.png'
  },
  {
    id: 522,
    link: 'http://openweathermap.org/img/wn/09d@2x.png'
  },
  {
    id: 531,
    link: 'http://openweathermap.org/img/wn/09d@2x.png'
  },
]
const Image = (id) => {
  WEATHER_ICONS.forEach((weather, i) =>{
    const ICon = id;
      if(ICon === WEATHER_ICONS[i].id) {
    dayFive.innerHTML += ` Current: <img src=${WEATHER_ICONS[i].link}>`
    }
  })
}
const IDArray = [200, 300, 500, 600]
IDArray.forEach(id => Image(id))

const SthlmTemp = () => {
    fetch(OurAPI).then((response) => {
        return response.json();
    }).then((json) => {
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
    console.log(temperatureFiveDays);
       
        let cloudSun = "./pics/Group34.png"
        let Rise = "./pics/sunrise.png"

        //Calculation to convert unix stamp to normal timezone
        let unixRise = json.list[0].sunrise;
        //let dateRise = new Date(unixRise*1000);
        //console.log(unixRise) Commented out
        let dateRise = new Date(unixRise*1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        
        const dateArray = [json.list[0].dt, json.list[1].dt, json.list[2].dt, json.list[3].dt, json.list[4].dt, json.list[5].dt];

        
        //
        let newDateArray = dateArray.map( (date) =>{
            const launchDate = new Date((date)*1000);
            //const dateTimeString = launchDate.toLocaleTimeString('en-US', {
                //timestyle:'short',
                //hour12:false,
            //});
            const dateDateString = launchDate.toLocaleDateString('en-US', {
                weekday:'short',
            })
            return dateDateString
        })
         //console.log(newDateArray)

        const test = Array.from(
            json.list, item => item.weather[0].main
        );
        //console.log(test);
            const currentDay =test[0];
            //console.log(currentDay); 
        const fiveDays = test.filter((day, index) => {
            return index >0 && index <6
            }
        )
        console.log(fiveDays);

        //console.log(weatherPic);

        let unixSet = json.list[0].sunset;
        //let dateSet = new Date(unixSet*1000);
        let dateSet = new Date(unixSet*1000).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");

        highlight.innerHTML = `Today the ${json.list[0]["weather"][0]["description"]}`
        cityName.innerHTML = `<h3>${json.city["name"]}</h3>`
        tempCelsius.innerHTML = ` Current: <img src=${cloudSun}> </img> ${json.list[0]["temp"]["day"]}℃ / Min: ${json.list[0]["temp"]["min"]}℃  /Max: ${json.list[0]["temp"]["max"]}℃` // The weather icon will be changed depending on time and is affected by an function that will trigger and if else statement(its its cloudy === this picture etc.)
        sunRise.innerHTML = `The Sun rises at ${dateRise} AM `
        sunSet.innerHTML = `The Sunset is at ${dateSet} PM` 


    for (let i = 1; i < newDateArray.length && i < temperatureArray.length; i++) {
        dayOne.innerHTML += `<dt>${newDateArray[i]}: ${temperatureArray[i]} </dt>`
    }




        /*dayOne.innerHTML = `${newDateArray[1]}: ${Weather[1]} ℃`;
        dayTwo.innerHTML = `${newDateArray[2]}: ${json.list[2]["temp"]["day"]} ℃`;
        dayThree.innerHTML = `${newDateArray[3]}: ${json.list[3]["temp"]["day"]} ℃`;
        dayFour.innerHTML = `${newDateArray[4]}: ${json.list[4]["temp"]["day"]} ℃`;
        dayFive.innerHTML = `${newDateArray[5]}: ${json.list[5]["temp"]["day"]} ℃`;*/

    })
}

SthlmTemp()



