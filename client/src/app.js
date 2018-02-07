const ListView = require('./views/listView.js');
const Request = require('./services/request.js');
// const listView = new ListView();
const bucketListRequest = new Request('http://localhost:3000/api/countries');
const countriesRequest = new Request('https://restcountries.eu/rest/v2');


var populateDropdown = function(countries){
  console.log(countries);
  var contents = document.querySelector('#dropdown');
  countries.forEach(function(country, index){
    var option = document.createElement('option');
    option.text = country.name;
    option.value = index;
    contents.appendChild(option);
  })
}

const app = function(){
  console.log("beep boop");
  countriesRequest.get(populateDropdown);

  



}

window.addEventListener('load', app);
