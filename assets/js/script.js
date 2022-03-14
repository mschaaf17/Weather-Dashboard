
var submitBtn = document.getElementById('submit');
//var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&appid=cf161441982aff595bf2e110785325f0';
//var units = '&units=imperial';
var currentWeather = document.getElementById('current-day-container')
//var citiesSearched = !!localStorage.getItem('citiesSearched') ? JSON.parse(localStorage.getItem('citiesSearched')) : [];
var citiesSearched = JSON.parse(localStorage.getItem('citiesSearched')) || [];
var cityListContainer = document.getElementById('cityListContainer');
var recentCitySearch = document.getElementById('searched')


//creates a button for each city searched
var recentSearches = function () {
  for (i = 0; i < citiesSearched.length; i++) {
    var cityBtns = document.createElement('button');
    cityBtns.classList.add('cityButtons')
    cityBtns.textContent = citiesSearched[i];
    cityListContainer.prepend(cityBtns)

  }
}
recentSearches()
var cityButtons = document.querySelectorAll('.cityButtons')



// function to set up url for search
var citySearched = function (e) {
  var cityName = document.querySelector('#city-name').value.trim();
  e.preventDefault();
  citiesSearched.push(cityName);
  localStorage.setItem('citiesSearched', JSON.stringify(citiesSearched));
  cityButtons = document.createElement('button');
  cityButtons.textContent = cityName;
  cityListContainer.prepend(cityButtons)
  displayCurrentWeather(cityName)
}


//function to retrieve current day weather
var displayCurrentWeather = function (cityName) {
  //fetch data to display on the page
  var currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}${apiKey}&units=imperial`
  fetch(currentUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json()
          .then(function (data) {

            //name data
            var cityName = document.getElementById('name')
            cityName.textContent = data.name
            currentWeather.appendChild(cityName)

            //date data
            var currentDate = document.getElementById('date')
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
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
            var dailyHumidity = document.getElementById('humidity')
            dailyHumidity.textContent = 'Humidity: ' + data.main.humidity + '%'
            currentWeather.appendChild(dailyHumidity)
            //weather icon
            var iconEl = document.getElementById('icon')
            var icon = data.weather[0].icon
            iconEl.src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
            futureWeather(data.coord.lat, data.coord.lon)

          })
      }
    })

}

//display 5-day forecast
var futureWeather = function (lat, lon) {
  var api2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}${apiKey}&units=imperial`
  fetch(api2)
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      console.log(data)
      //uv index
      var uvEl = document.getElementById('uv');
      var uvData = data.current.uvi;
      uvEl.textContent = 'UV: ' + uvData;
      currentWeather.appendChild(uvEl);
      if (uvData >= 6) {
        uvEl.style.backgroundColor = 'red';
      } else if (uvData <= 2) {
        uvEl.style.backgroundColor = 'green';
      };
      if (uvData >= 3 && uvData <=5) {
        uvEl.style.backgroundColor = 'yellow'
      };
      var forecastTitle = document.getElementById('forecastTitle')
      forecastTitle.textContent = '5-Day Forecast:';
      var forecastEl = document.getElementsByClassName('forecast')
      //forecastEl.classList.add(".forecast-card")
      for (var i = 1; i <= 5; i++) {
        var current = data.daily[i]
        var forecastDate = document.querySelector('.forecastDate' + i)
        forecastDate.textContent = new Date(current.dt * 1000).toLocaleDateString()
        var forecastIcon = document.querySelector('.forecastIcon' + i)
        var icon = current.weather[0].icon
        forecastIcon.src = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
        var forecastTemp = document.querySelector('.forecastTemp' + i)
        forecastTemp.textContent = 'Temp: ' + Math.round(current.temp.day) + String.fromCharCode(176) + ' F';
        var forecastWind = document.querySelector('.forecastWind' + i)
        forecastWind.textContent = 'Wind: ' + current.wind_speed + ' MPH'
        var forecastHumidity = document.querySelector('.forecastHumidity' + i)
        forecastHumidity.textContent = 'Humidity: ' + current.humidity + '%'


      }

    })
}


submitBtn.addEventListener("click", citySearched)


//section for previous searches
var previousSearch = function (event) {
  var city = event.target.textContent
  displayCurrentWeather(city);
}

Array.from(cityButtons).forEach(function (button) {
  button.addEventListener("click", previousSearch);
})

