//?q=London this is a key and then value to add api key _=_&_=_&
//var requestUrl = fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=e999a470cbbde7da1e47653e4e675d9d&units=metric');



var submitBtn = document.getElementById('submit');
var api = 'https://api.openweathermap.org/data/2.5/weather?q=';

var apiKey = '&appid=e999a470cbbde7da1e47653e4e675d9d'; 
var units = '&units=metric';
var invalid = document.querySelector('.msg');


//make button to update url with value
submitBtn.addEventListener("click", function(event) {
  var inputEl = document.querySelector('#city-name').value.trim();
  event.preventDefault(); 
  var updatedUrl = api + inputEl + apiKey + units;
  console.log(updatedUrl)
  //var citiesList= document.createElement('p');
  //citiesList.textContent = inputEl;
  //cityListContainer.appendChild(citiesList);

  var citiesSearched = !!localStorage.getItem('citiesSearched') ? JSON.parse(localStorage.getItem('citiesSearched')) : [];
  citiesSearched.push(inputEl);
  localStorage.setItem('citiesSearched', JSON.stringify(citiesSearched));
  
  for(i=0; i<citiesSearched.length; i++) {
    var cityListContainer = document.querySelector('#cityListContainer');
    var cityList = document.createElement('p');
    cityList.textContent = citiesSearched[i]
    cityListContainer.appendChild(cityList)

  }

   //localStorage.setItem("search history", JSON.stringify(inputEl));

})