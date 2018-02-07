const ListView = require('./views/listView.js');
const Request = require('./services/request.js');
const listView = new ListView();
const bucketListRequest = new Request('http://localhost:3000/api/countries');
const countriesRequest = new Request('https://restcountries.eu/rest/v2');


var doSomethingWithCountries = function(countries) {
  var select = document.querySelector('#dropdown')
  select.addEventListener('change', function(event){
    var number = event.target.value;
    var selection = countries[number].name;
    console.log(selection);

    var dbAddition = {
	"name": selection
}
    bucketListRequest.post(dbAddition)
    listView.addCountry(selection)
  })
}

var populateDropdown = function(countries){
  var contents = document.querySelector('#dropdown');
  countries.forEach(function(country, index){
    var option = document.createElement('option');
    option.text = country.name;
    option.value = index;
    contents.appendChild(option);
  })
  doSomethingWithCountries(countries);
}

var countryNames = function(allcountriesinfo){
  var newArray = [];
  allcountriesinfo.forEach(function(element){
    newArray.push(element.name);
  })
  return newArray;
}

var displayPreviousChoices =

const app = function(){
  countriesRequest.get(populateDropdown);

  var select = document.querySelector('#dropdown');
  select.addEventListener('change', function(event){
    var number = event.target.value;
  })
}
listView.render(bucketListRequest)





window.addEventListener('load', app);
