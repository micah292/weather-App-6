//api key to allow unique sync
const APIKey = "0d200f52ad5e6e94ff9e5b211cd4d196";
// variable that holds previous search
var former = [];
var Run = true; 
//repeats searches

// search history 
var records = document.getElementById('past-city-searches');
//container
var handler = document.getElementById('weather-header');

function SearchRequest ()
{
    //search bar container 
    let pursue = document.getElementById('city-search-bar').value;
    former.push(pursue);
    console.log(pursue);
    getApiData(pursue);
    addToSearchHistory();
}
// api fetch-return info function
function getApiData(cityName) {
    //city specific function
    let city = cityName;
    //api link
    let requestURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    terminate();
    //clear
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+APIKey+'&units=imperial')
        .then(function (reply) {
            return reply.json();
        })

        .then(function (data) {
            console.log(data);
            console.log(data.list[1].main.temp);

            let location = document.createElement('h1');
            location.setAttribute('id', 'city-tag');
            location.innerText = city;
            handler.prepend(location);
// temp documentaion specific api function
            let climate = document.createElement('p');
            climate.setAttribute('id', 'todays-temp');
            climate.innerText = `temperature: ${data.list[1].main.temp}F`;
            handler.appendChild(climate);
// wind document specific api function
            let breeze = document.createElement('p');
            breeze.setAttribute('id', 'todays-wind-speed');
            breeze.innerText = `wind speed is: ${data.list[1].wind.speed}MPH`;
            handler.appendChild(breeze);
// humidity document specific api function
            let moisture = document.createElement('p');
            moisture.innerText = `humidity is: ${data.list[1].main.humidity}%`;
            moisture.setAttribute('id', 'todays-humidity');
            handler.appendChild(moisture);
// day presenter math function
            for (let i = 0; i < data.list.length; i+=8)
            {
                console.log(data.list[i].main.temp);
                // card class (handlerCard)
                let handlerCard = document.createElement('div');
                handlerCard.setAttribute('id', `day-${[i]}`);
                handlerCard.classList.add('weather-cards');
                document.getElementById('dynamic-forecast-cards').appendChild(handlerCard);
                //date func
                let weatherdate = document.createElement('h1');
                weatherdate.innerText = data.list[i].dt_txt;
                handlerCard.appendChild(weatherdate);
                //temp func
                let weathertemp = document.createElement('p');
                weathertemp.innerText = `temperature: ${data.list[i].main.temp}F`;
                handlerCard.appendChild(weathertemp);
                // wind velocity func
                let weatherwind = document.createElement('p');
                weatherwind.innerText = `wind speed is: ${data.list[i].wind.speed}MPH`;
                handlerCard.appendChild(weatherwind);
                // humidity func
                let weatherhumidity = document.createElement('p');
                weatherhumidity.innerText = `humidity is: ${data.list[i].main.humidity}%`;
                handlerCard.appendChild(weatherhumidity);
                
            }
            
        })

}
// search history
function addToSearchHistory () {
    terminate ();
    console.log('lost');
    console.log(former.length);
    former.forEach(addToList)
}
// add  to list
function addToList (item, index) {
    let strand = document.createElement('li');
    strand.innerText=item;
    strand.setAttribute('id', 'past-search-item');
    records.appendChild(strand);
    strand.addEventListener('click', repeatSearch(item))

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

function terminate () {
    records.innerHTML='';
    let cardsToErase = document.getElementById('dynamic-forecast-cards');
    while (cardsToErase.firstChild) {
        cardsToErase.removeChild(cardsToErase.firstChild);
    }
    let erase = document.getElementById('weather-header');
    while (erase.firstChild) {
        erase.removeChild(erase.firstChild);
    }
}