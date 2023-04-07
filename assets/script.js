//api key to allow unique sync
const APIKey = "0d200f52ad5e6e94ff9e5b211cd4d196";
// variable that holds previous search
var previousSearches = [];
var Run = true; 
//repeats searches

// search history 
var searchHistoryList = document.getElementById('past-city-searches');
//container
var weatherheader = document.getElementById('weather-header');

function SearchRequest ()
{
    //search bar container holding past searches from console
    let search = document.getElementById('city-search-bar').value;
    previousSearches.push(search);
    console.log(search);
    getApiData(search);
    addToSearchHistory();
}
// api fetch-return info function
function getApiData(cityName) {
    //city specific function
    let city = cityName;
    //api link
    let requestURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    clearSlate();
    //clear
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+APIKey+'&units=imperial')
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);
            console.log(data.list[1].main.temp);

            let headerCityTag = document.createElement('h1');
            headerCityTag.setAttribute('id', 'city-tag');
            headerCityTag.innerText = city;

            weatherheader.prepend(headerCityTag);
// temp documentaion specific api function
            let headertemp = document.createElement('p');
            headertemp.setAttribute('id', 'todays-temp');
            headertemp.innerText = `temperature: ${data.list[1].main.temp}F`;
            weatherheader.appendChild(headertemp);
// wind document specific api function
            let headerwind = document.createElement('p');
            headerwind.setAttribute('id', 'todays-wind-speed');
            headerwind.innerText = `wind speed is: ${data.list[1].wind.speed}MPH`;
            weatherheader.appendChild(headerwind);
// humidity document specific api function
            let headerhumidity = document.createElement('p');
            headerhumidity.innerText = `humidity is: ${data.list[1].main.humidity}%`;
            headerhumidity.setAttribute('id', 'todays-humidity');
            weatherheader.appendChild(headerhumidity);
// day presenter math function
            for (let i = 0; i < data.list.length; i+=8)
            {
                console.log(data.list[i].main.temp);
                
                let weatherCard = document.createElement('div');
                weatherCard.setAttribute('id', `day-${[i]}`);
                weatherCard.classList.add('weather-cards');
                document.getElementById('dynamic-forecast-cards').appendChild(weatherCard);
                //date func
                let weatherdate = document.createElement('h1');
                weatherdate.innerText = data.list[i].dt_txt;
                weatherCard.appendChild(weatherdate);
                //temp func
                let weathertemp = document.createElement('p');
                weathertemp.innerText = `temperature: ${data.list[i].main.temp}F`;
                weatherCard.appendChild(weathertemp);
                // wind velocity func
                let weatherwind = document.createElement('p');
                weatherwind.innerText = `wind speed is: ${data.list[i].wind.speed}MPH`;
                weatherCard.appendChild(weatherwind);
                // humidity func
                let weatherhumidity = document.createElement('p');
                weatherhumidity.innerText = `humidity is: ${data.list[i].main.humidity}%`;
                weatherCard.appendChild(weatherhumidity);
                
            }
            
        })

}
// search history
function addToSearchHistory () {
    clearSlate ();
    console.log('hi');
    console.log(previousSearches.length);
    previousSearches.forEach(addToList)
}
// add  to list
function addToList (item, index) {
    let listElement = document.createElement('li');
    listElement.innerText=item;
    listElement.setAttribute('id', 'past-search-item');
    searchHistoryList.appendChild(listElement);
    listElement.addEventListener('click', repeatSearch(item))

}

function repeatSearch(city) {
    if (Run)
    {
        console.log('true')
    }
    else{
        getApiData(city);
    }
}

function clearSlate () {
    searchHistoryList.innerHTML='';
    let cardsToClear = document.getElementById('dynamic-forecast-cards');
    while (cardsToClear.firstChild) {
        cardsToClear.removeChild(cardsToClear.firstChild);
    }
    let headertoClear = document.getElementById('weather-header');
    while (headertoClear.firstChild) {
        headertoClear.removeChild(headertoClear.firstChild);
    }
}