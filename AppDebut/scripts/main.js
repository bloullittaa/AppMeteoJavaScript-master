const CLEFAPI = '89dc54aa9d351dcc32ffa0b907359c7e'
let resultatsAPI; 
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
       
        //console.log(position); pour avoir position gps
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
         AppelAPI (long, lat);
        
    }, () => {
            alert(`Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner, veuillez l'activer`)
        
    })
}
function AppelAPI (long, lat){
    //console.log(long,lat);pour voir longitude et latitude 
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
    //exclude=minutely&units=metric&lang=fr exclure munutes et ajouter langue 
.then( (reponse) => {
return reponse.json();
})
 .then((data) => {
 //console.log(data);
 resultatsAPI = data;
 temps.innerText = resultatsAPI.current.weather[0].description
 temperature.innerText = `${resultatsAPI.current.temp}°`
 Math.trunc = temperature
 localisation.innerText = resultatsAPI.timezone;

 })
}