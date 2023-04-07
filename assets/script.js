const APIKey = "0d200f52ad5e6e94ff9e5b211cd4d196";
var previousSearches = [];
var Run = true; 
//repeats searches

var searchList = document.getElementById('past-city-searches');
var weatherheader = document.getElementById('weather-header');
function SearchRequest ()
{
    let search = document.getElementById('city-search-bar').value;
    previousSearches.push(search);
    console.log(search);
    getApiData(search);
    addToSearchHistory();
}

function getApiData(cityName) {
    let city = cityName;
    let requestURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    clearSlate();
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+APIKey+'&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.list[1].main.temp);
            let location = document.createElement('h1');
            location.setAttribute('id', 'city-tag');
            location.innerText = city;

            weatherheader.prepend(location);

            let temperature = document.createElement('p');
            temperature.setAttribute('id', 'todays-temp');
            temperature.innerText = `temperature: ${data.list[1].main.temp}F`;
            weatherheader.appendChild(temperature);

            let wind = document.createElement('p');

            wind.setAttribute('id', 'todays-wind-speed');
            wind.innerText = `wind speed is: ${data.list[1].wind.speed}MPH`;
            weatherheader.appendChild(wind);

            let humidity = document.createElement('p');
            humidity.innerText = `humidity is: ${data.list[1].main.humidity}%`;
            humidity.setAttribute('id', 'todays-humidity');
            weatherheader.appendChild(humidity);

            for (let i = 0; i < data.list.length; i+=8)
            {
                console.log(data.list[i].main.temp);

                let weatherCard = document.createElement('div');
                weatherCard.setAttribute('id', `day-${[i]}`);
                weatherCard.classList.add('weather-cards');
                document.getElementById('dynamic-forecast-cards').appendChild(weatherCard);

                let weatherdate = document.createElement('h1');
                weatherdate.innerText = data.list[i].dt_txt;
                weatherCard.appendChild(weatherdate);

                let weathertemperature = document.createElement('p');
                weathertemperature.innerText = `temperature: ${data.list[i].main.temp}F`;
                weatherCard.appendChild(weathertemperature);

                let weatherwindVelocity = document.createElement('p');
                weatherwindVelocity.innerText = `wind speed is: ${data.list[i].wind.speed}MPH`;
                weatherCard.appendChild(weatherwindVelocity);

                let weatherhumidityPercentage = document.createElement('p');
                weatherhumidityPercentage.innerText = `humidity is: ${data.list[i].main.humidity}%`;
                weatherCard.appendChild(weatherhumidity);
                
            }
            
        })

}

function addToSearchHistory () {
    clearSlate ();
    console.log('hi');
    console.log(previousSearches.length);
    previousSearches.forEach(addToList)
}

function addToList (item, index) {
    let listElement = document.createElement('li');
    listElement.innerText=item;
    listElement.setAttribute('id', 'past-search-item');
    searchList.appendChild(listElement);
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
    searchList.innerHTML='';
    let cardsToClear = document.getElementById('dynamic-forecast-cards');
    while (cardsToClear.firstChild) {
        cardsToClear.removeChild(cardsToClear.firstChild);
    }
    let headertoClear = document.getElementById('weather-header');
    while (headertoClear.firstChild) {
        headertoClear.removeChild(headertoClear.firstChild);
    }
}