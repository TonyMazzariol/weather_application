let submit = document.getElementById('submit');
let auto_list = document.getElementById('auto_list');
let city_name = document.getElementById('city_name');
let my_position = document.getElementById('my_position');


// SET LOADER
document.getElementById('loader').hidden = true;


// GEOLOCALISATION

my_position.addEventListener('click', function search() {

    navigator.geolocation.getCurrentPosition(function(position) {

        console.log(position.coords.latitude, position.coords.longitude);
        let lat =position.coords.latitude
        let long =position.coords.longitude

        // ACTIVE LOADER
        document.getElementById('loader').hidden = false;
        
        fetch('api.openweathermap.org/data/2.5/weather?lat='+lat.toFixed(4)+'&lon='+long.toFixed(4)+'&appid=3ff862a7e42ee9117fa7f0258d22df70&units=metric&lang=fr') 
        
        .then( function (grad) {
            return grad.json()
        })
        .then( function (Position) {
            // KILL LOADER
            document.getElementById('loader').hidden = true;

            console.log(Position);
        })
    })
});


// AUTOCOMPLETE FUNCTION

city_name.addEventListener("input", function search() {

    fetch('https://geo.api.gouv.fr/communes?nom='+city_name.value+'&fields=departement&boost=population&limit=5')
    .then( function (name) {
        return name.json()
    })
    .then( function (Name) {

        if (Name.length > 1) {
            auto_list.innerHTML = '';
            Name.forEach(row => {
                let option = document.createElement('option');
                let new_name = document.createTextNode(row.nom);
                option.appendChild(new_name);
                auto_list.appendChild(option) 
                
            });
        } else {
        }    
    })
});


// GET WEATHER FUNCTION

submit.addEventListener("click", function search() {
    
    // ACTIVE LOADER
    document.getElementById('loader').hidden = false;
    

    fetch('http://api.openweathermap.org/data/2.5/weather?q='+city_name.value+'&appid=6a9d5df73ece48db50d7ce57ea402886&units=metric&lang=fr')
    .then( function (data) {
        return data.json(); 
    })
    .then( function (Data) {
    
    // KILL LOADER
    document.getElementById('loader').hidden = true;
    
    /*  -----------  */    
    console.log(Data);
    /*  -----------  */    

    let name = document.getElementById('name')
    name.textContent = Data.name
    
    let temp = document.getElementById('temp_average')
    temp.textContent = ("température moyenne : "+Data.main.temp+"°")
    
    let temp_min = document.getElementById('temp_min')
    temp_min.textContent = ("température minimale : "+Data.main.temp_min+"°")
    
    let temp_max = document.getElementById('temp_max')
    temp_max.textContent = ("température maximale : "+Data.main.temp_max+"°")
    
    let temp_feel = document.getElementById('temp_feel')
    temp_feel.textContent = ("température ressenti : "+Data.main.feels_like+"°")
    
    let wind_speed = document.getElementById('wind_speed')
    wind_speed.textContent = ("vitesse du vent : "+Data.wind.speed+" km/h")
    
    let degrees = Data.wind.deg;
    let directions = ['nord', 'nord-est', 'est', 'sud-est', 'sud', 'sud-ouest', 'ouest', 'nord-ouest'];
    degrees = degrees * 8 / 360;
    degrees = Math.round(degrees, 0);
    degrees = (degrees + 8) % 8
    
    let wind_deg = document.getElementById('wind_deg')
    wind_deg.textContent = ("direction du vent : "+directions[degrees])
    
    let humidity = document.getElementById('humidity')
    humidity.textContent = ("humidité : "+Data.main.humidity+"%")
    
    let icon_weather = document.getElementById('icon_weather')
    icon_weather.src = get_icon(Data.weather[0].icon) 

    })        
})



function get_icon(icon) {
    switch (icon) {
        case "01d":
            return "/icons/wi_clear-day.svg";
        case "02d":
            return "/icons/wi_partly-cloudy-day.svg";
        case "03d":
        case "03n":
            return "/icons/wi_cloudy.svg";
        case "04d":
        case "04n":
            return "/icons/wi_extreme.svg";
        case "09d":
        case "09n":
            return "/icons/wi_extreme-rain.svg";
        case "10d":
            return "/icons/wi_overcast-day-rain.svg";
        case "11d":
            return "/icons/wi_thunderstorms-extreme.svg";
        case "13d":
        case "13n":
            return "/icons/wi_snowflake.svg";
        case "50d":
        case "50n":
            return "/icons/wi_mist.svg";
        case "01n":
            return "/icons/wi_clear-night.svg";
        case "02n":
            return "/icons/wi_partly-cloudy-night.svg";
        case "10n":
            return "/icons/wi_overcast-night-rain.svg";    
        default:
            break;
    }
}




