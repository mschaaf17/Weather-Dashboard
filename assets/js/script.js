
//setting up the url for current day
var submitBtn = document.getElementById('submit');
var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&appid=cf161441982aff595bf2e110785325f0'; 
var units = '&units=imperial';
var daily = '&daily';
//var invalid = document.querySelector('.msg');
//https://api.openweathermap.org/data/2.5/onecall?lat=40.6669&lon=-111.888&exclude=hourly,minutely&appid=e999a470cbbde7da1e47653e4e675d9d

var cityListContainer = document.getElementById('cityListContainer')
  Object.keys(localStorage).forEach(function(key){ 
  console.log(localStorage.getItem(key))
   var cityButtons= document.createElement('button')
  cityButtons.innerHTML= JSON.parse(localStorage.getItem(key))
  cityListContainer.append(cityButtons)
})

 //document.querySelector('#cityListContainer').innerHTML = JSON.parse(localStorage.getItem('citiesSearched'))

//make button to update url with value
submitBtn.addEventListener("click", function(event) {
  var inputEl = document.querySelector('#city-name').value.trim();
  event.preventDefault(); 
  var currentUrl = api + inputEl + daily + apiKey + units;
  console.log(currentUrl)


//everytime its clicked it repeats the local storage
  //set up local storage
var citiesSearched = !!localStorage.getItem('citiesSearched') ? JSON.parse(localStorage.getItem('citiesSearched')) : [];
citiesSearched.push(inputEl);
localStorage.setItem('citiesSearched', JSON.stringify(citiesSearched));


//display local storage ---stay after refresh
for(i=0; i<citiesSearched.length; i++) {
  var cityListContainer = document.querySelector('#cityListContainer');
  //var inputEl = document.querySelector('#city-name').value.trim();
  var cityList = document.createElement('p');
  cityList.classList.add('search-history')
  cityList.textContent = citiesSearched[0]
  cityListContainer.appendChild(cityList) 
  //once clicked the submitBtn function has to run again so this can't be in it!
  cityList.addEventListener('click', function(e) {
    console.log('clicked')
    if('clicked') {
      //find a way to make the click to match the value
      return displayCurrentWeather();
    }
  }) 
  }

//if the local storage is in the submitBtn it works

//function set up to retrieve information on a repeat click
var displayCurrentWeather = function() {


//fetch data to display on the page
  fetch(currentUrl) 
  .then(function(response) {
    if(response.ok) {
    return response.json()
    .then(function(data) {
      console.log(data)
      //container for all info
      var currentWeather = document.getElementById('current-day-container')
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
      icon= data.weather[0].icon
      iconEl.src= 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
      iconEl.appendChild(icon)
    
    })
  }
  })
  
}





displayCurrentWeather();


})