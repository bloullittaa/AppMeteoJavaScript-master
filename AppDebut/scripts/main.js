
const CLEFAPI = '89dc54aa9d351dcc32ffa0b907359c7e'
let resultatsAPI; 
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp')
const imgIcone = document.querySelectorAll('.logo-meteo')
const chargementContainer = document.querySelector('.overlay-icone-chargement')

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
 temperature.innerText = `${Math.trunc( resultatsAPI.current.temp)}°`
 localisation.innerText = resultatsAPI.timezone;

// les heures par tranches de 3 avec leur temperature.
let heureActuelle = new Date() .getHours();
for (let i = 0; i < heure.length; i++ ){
    let heureIncr  = heureActuelle + i * 3;
    if(heureIncr > 24){
        heure [i].innerText =`${heureIncr - 24}h`;
    }
        else if (heureIncr === 24 ){
            heure[i].innerText = "00 h"
        } else {
    heure[i].innerText = `${heureIncr}h`;
        }
}
  // temp pour 3 h
  for(let j = 0; j < tempPourH.length; j++){
      tempPourH[j].innerText = `${Math.trunc( resultatsAPI.hourly[j * 3].temp)}°`
    }
    // trois premières lettres des jours
    for(let k = 0; k < tabJoursEnOrdre.length; k++) {
        joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0,3);

    }

// le temps par jour 
for (let m = 0; m < 7; m++){
    tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m + 1].temp.day)}°`
}


// icone dynamique
    if(heureActuelle >= 6 && heureActuelle < 21){
        imgIcone.src = `resources/jour/${resultatsAPI.current.weather[0].icon}.svg`
    } else {
        imgIcone.src = `resources/nuit/${resultatsAPI.current.weather[0].icon}.svg`
    }
    chargementContainer.classList.add('disparition');
 })
}
