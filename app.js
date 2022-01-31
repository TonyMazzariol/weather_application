
document.getElementById('loader').hidden = true;



let submit = document.getElementById('submit');

submit.addEventListener("click", function search(cityName) {

    cityName = document.getElementById('city');
    
    document.getElementById('loader').hidden = false;

    fetch('http://api.openweathermap.org/data/2.5/weather?q='+cityName.value+'&appid=6a9d5df73ece48db50d7ce57ea402886&units=metric&lan=fr')
    .then( function (data) {

    return data.json(); 
    })
    .then( function (Data) {
    
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
    
    degrees = Data.wind.deg;
    directions = ['nord', 'nord-est', 'est', 'sud-est', 'sud', 'sud-ouest', 'ouest', 'nord-ouest'];
    degrees = degrees * 8 / 360;
    degrees = Math.round(degrees, 0);
    degrees = (degrees + 8) % 8
    
    let wind_deg = document.getElementById('wind_deg')
    wind_deg.textContent = ("direction du vent : "+directions[degrees])
    
    let humidity = document.getElementById('humidity')
    humidity.textContent = ("humidité : "+Data.main.humidity+"%")
    
    // let icon_weather = document.getElementById('icon_weather')
    // icon_weather.src = "http://openweathermap.org/img/wn/"+Data.weather[0].icon+"@2x.png" 
    
    })

        
})






