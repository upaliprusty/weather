let input = document.getElementById('cityname');
let searchbtn = document.getElementById('searchbtn');
let cityNameElement = document.getElementById('city');
let temp = document.getElementById('temp');
let description = document.getElementById('description');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let weatherIcon = document.getElementById('weather-icon');
let apiinfo = [];

// https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=3ba0e5eedae49070b51c85ad8c30def0&units=metric

const apicall = async (cityName) =>{
   let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3ba0e5eedae49070b51c85ad8c30def0&units=metric`
   try {
        const respone = await fetch(api);
        const json = await respone.json();
        apiinfo.push(json);
        if(apiinfo[0].cod == 404){
            cityNameElement.textContent = 'City not found';
            return;
        }
        cityNameElement.textContent = `Weather in ${cityName}`
        console.log(apiinfo);
        temp.textContent = `${apiinfo[0].main.temp}°C`
        description.textContent = `${apiinfo[0].weather[0].description}`
        humidity.textContent = `Humidity: ${apiinfo[0].main.humidity}`
        wind.textContent = `Wind Speed: ${apiinfo[0].wind.speed} km/h`

        const iconCode = json.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
        weatherIcon.src = iconUrl;

   } catch (error) {
    console.log('Error fetching data', error);
   }
}


searchbtn.addEventListener('click', ()=>{
    let cityname = input.value.toLowerCase();
    apicall(cityname);
    input.value = '';
    input.focus();
})