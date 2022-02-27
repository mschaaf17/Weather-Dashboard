//?q=London this is a key and then value to add api key _=_&_=_&
//var requestUrl = fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=e999a470cbbde7da1e47653e4e675d9d&units=metric');

//setting up the url
var submitBtn = document.getElementById('submit');
var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&appid=e999a470cbbde7da1e47653e4e675d9d'; 
var units = '&units=metric';
var invalid = document.querySelector('.msg');

//set up local storage
var citiesSearched = !!localStorage.getItem('citiesSearched') ? JSON.parse(localStorage.getItem('citiesSearched')) : [];
citiesSearched.push(inputEl);
localStorage.setItem('citiesSearched', JSON.stringify(citiesSearched));

//display local storage 
for(i=0; i<citiesSearched.length; i++) {
  var cityListContainer = document.querySelector('#cityListContainer');
  var inputEl = document.querySelector('#city-name').value.trim();
  var cityList = document.createElement('p');
  cityList.classList.add('search-history')
  cityList.textContent = citiesSearched[i]
  cityListContainer.appendChild(cityList) 
  //once clicked the submitBtn function has to run again so this can't be in it!
  cityList.addEventListener('click', function(e) {
    console.log('clicked')
  }) 
  }

//if the local storage is in the submitBtn it works


//make button to update url with value
submitBtn.addEventListener("click", function(event) {
  var inputEl = document.querySelector('#city-name').value.trim();
  event.preventDefault(); 
  var updatedUrl = api + inputEl + apiKey + units;
  console.log(updatedUrl)

 

  

//display name, date, temp, wind, humidity, wind
var currentWeather = document.getElementById('current-day-container')
var currentName= document.createElement('h2')
currentName.textContent = inputEl;

var currentDate = document.createElement('h2')
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
currentDate.textContent = date

  //fetch data to display on the page
  fetch(updatedUrl) 
  .then(function(response) {
    if(response.ok) {
    return response.json()
    .then(function(data) {
      console.log(data)
      //daily temp data
        var dailyTemp = document.createElement('p')
        dailyTemp.textContent = 'Temp: ' + Math.floor((data.main.temp*1.8)+32) + String.fromCharCode(176) + ' F'
        currentWeather.appendChild(dailyTemp)
      //daily wind data
        var dailyWind = document.createElement('p')
        dailyWind.textContent = 'Wind: ' + data.wind.speed + ' MPH'
        currentWeather.appendChild(dailyWind)
      //daily humidity
      var dailyHumidity= document.createElement('p')
      dailyHumidity.textContent = 'Humidity: ' + data.main.humidity + '%'
      currentWeather.appendChild(dailyHumidity)

      
      
    })
  }
  })



currentWeather.appendChild(currentName)
currentWeather.appendChild(currentDate)










})