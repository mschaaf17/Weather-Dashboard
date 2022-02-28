
//setting up the url for current day
var submitBtn = document.getElementById('submit');
var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&appid=cf161441982aff595bf2e110785325f0'; 
var units = '&units=imperial';
var currentWeather = document.getElementById('current-day-container')


//var invalid = document.querySelector('.msg');
//https://api.openweathermap.org/data/2.5/onecall?lat=40.6669&lon=-111.888&exclude=hourly,minutely&appid=cf161441982aff595bf2e110785325f0
var citiesSearched = !!localStorage.getItem('citiesSearched') ? JSON.parse(localStorage.getItem('citiesSearched')) : [];
var cityListContainer = document.getElementById('cityListContainer');

//creates a button for each city searched
for(i=0; i<citiesSearched.length; i++) {
  var cityButtons= document.createElement('button');
  cityButtons.textContent = citiesSearched[i];
  cityListContainer.append(cityButtons)
  var cityButtonsClick = cityButtons
  cityButtonsClick.addEventListener('click', function(event){
  console.log(citiesSearched[i]);
})
}

//make button to update url with value
submitBtn.addEventListener("click", function(event) {
  var inputEl = document.querySelector('#city-name').value.trim();
  event.preventDefault(); 
  var currentUrl = api + inputEl + apiKey + units;
  console.log(currentUrl)
  citiesSearched.push(inputEl);
  localStorage.setItem('citiesSearched', JSON.stringify(citiesSearched));


//function set up to retrieve information on a repeat click
var displayCurrentWeather = function() {
//fetch data to display on the page
  fetch(currentUrl) 
  .then(function(response) {
    if(response.ok) {
    return response.json()
    .then(function(data) {
      console.log(data)
      coordinates(data.coord.lat, data.coord.lon)
      //container for all info
      
      //name data
      var cityName = document.getElementById('name')
      cityName.textContent = data.name
      currentWeather.appendChild(cityName)

      //date data
      var currentDate = document.getElementById('date')
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
      currentDate.textContent = date
      currentWeather.appendChild(currentDate)

      //daily temp data
        var dailyTemp = document.getElementById('dailyTemp')
        dailyTemp.textContent = 'Temp: ' + Math.round(data.main.temp) + String.fromCharCode(176) + ' F'
        currentWeather.appendChild(dailyTemp)
      //daily wind data
        var dailyWind = document.getElementById('wind')
        dailyWind.textContent = 'Wind: ' + data.wind.speed + ' MPH'
        currentWeather.appendChild(dailyWind)
      //daily humidity
      var dailyHumidity= document.getElementById('humidity')
      dailyHumidity.textContent = 'Humidity: ' + data.main.humidity + '%'
      currentWeather.appendChild(dailyHumidity)

      
      
      //weather icon
      //var icon = document.createElement('img')
      var iconEl= document.getElementById('icon')
      var icon= data.weather[0].icon
      iconEl.src= 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
      //iconEl.appendChild(icon)
    
    })
  }
  })
  
}

var coordinates = function(lat, lon) {
  var api2 =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}${apiKey}&units=imperial`
  fetch(api2)
  .then(function(res){
    return res.json()
  })
.then(function(data) {
  console.log(data)
  //uv index---find this in open weather app

  var uvEl= document.getElementById('uv');
  var uvData = data.current.uvi;
  uvEl.textContent = 'UV: ' + uvData;
  currentWeather.appendChild(uvEl);
  if(uvData > 0) {
    uvEl.style.backgroundColor ='red';
  } else if (uvData < 0) {
    uvEl.style.backgroundColor = 'green';
  };
  if (uvData === 0) {
    uvEl.style.backgroundColor = 'yellow'
  };
  var forecastTitle = document.getElementById('forecastTitle')
  forecastTitle.textContent = '5-Day Forecast:';
  var forecastEl = document.getElementsByClassName('forecast')
  for(var i = 1; i <= 5; i++) {
    var current = data.daily[i]
    var forecastDate = document.querySelector('.forecastDate'+ i)
    forecastDate.textContent = new Date(current.dt * 1000).toLocaleDateString()
    var forecastTemp = document.querySelector('.forecastTemp' + i)
    forecastTemp.textContent ='Temp: ' + Math.round(current.temp.day) + String.fromCharCode(176) + ' F';
    var forecastWind = document.querySelector('.forecastWind' + i)
   forecastWind.textContent= 'Wind: ' + current.wind_speed + ' MPH'
    var forecastHumidity = document.querySelector('.forecastHumidity'+ i)
    forecastHumidity = 'Humidity: ' + current.humidity + '%'
  }

})
}


displayCurrentWeather();


})