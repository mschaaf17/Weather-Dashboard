//?q=London this is a key and then value to add api key _=_&_=_&
//var requestUrl = fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=e999a470cbbde7da1e47653e4e675d9d&units=metric');


var api = 'https://api.openweathermap.org/data/2.5/weather?q='
var city = ""
var apiKey = '&appid=e999a470cbbde7da1e47653e4e675d9d' 
var units = '&units=metric';

var updatedUrl = api + city + apiKey + units 

console.log(updatedUrl); 


