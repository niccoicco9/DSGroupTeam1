/*global google */
/*global moment */
/*global extractWeather */
var currentPosition = '';
var oldAccess = '';
var latitulong = '';
var user = '';
var map;
window.addEventListener('load', function () {
    'use strict';
    loadPosition();
    
});
function loadSite(weather) {
    'use strict';
    
    var oldDate = '';
    if (localStorage && localStorage.ultimoaccesso) {
        oldDate = localStorage.ultimoaccesso;
    } else {
        oldDate = "MAI";
    }
    localStorage.setItem('ultimoaccesso', moment().format('LL') + ' ' + moment().format('LTS'));
    if (localStorage && localStorage.username) {
        user = localStorage.username;
    } else {
        user = 'Mario';
        localStorage.username = user;
    }
    oldAccess = user + " ultimo accesso " + oldDate;

    var arrayId = ['nome', 'accesso', 'icona', 'temp', 'wind', 'cloudiness', 'pressure', 'humidity', 'sunrise', 'sunset'];
    var arrayValue = [user, oldDate, weather.weather[0].icon, weather.main.temp, weather.wind, weather.weather[0].description, weather.main.pressure, weather.main.humidity, weather.sys.sunrise, weather.sys.sunset];
    for (var i = 0; i < arrayId.length; i++) {
        load(arrayId[i], arrayValue[i]);
    }
}


function loadPosition() { //geolocalizza e restituisce l'indirizzo utilizzando il reverse geocoding
    'use strict';
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(funzioneOk, funzioneErrore);
    } else {
        alert('non disponibile');
    }
}
function funzioneOk(position) {
    'use strict';
    if (position && position.coords) {
        var latitudine = position.coords.latitude;
        var longitudine = position.coords.longitude;
        var mapProp = {
            center: new google.maps.LatLng(latitudine, longitudine),
            zoom: 16,
        };
        latitulong = mapProp.center;
        

        var name = document.getElementById('geoCoords');
        name.innerText = latitulong.lat().toFixed(2) + ', ' + latitulong.lng().toFixed(2);
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'location': mapProp.center }, function (results) {
            if (results[0]) {
                currentPosition = results[0].formatted_address;
                var luogo = document.getElementById('luogo');
                luogo.innerText = currentPosition;
            } else {
                alert('No Result');
            }
        });
        map = new google.maps.Map(document.getElementById("mappa"), mapProp);
        new google.maps.Marker({
            position: mapProp.center,
            map: map
        });
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat='+latitulong.lat()+'&lon='+latitulong.lng()+'&APPID=ee6b293d773f4fcd7e434f79bbc341f2', loadSite);
    }
}
function funzioneErrore(error) {
    'use strict';
    alert(error.message);
}
function load(id, value) {
    'use strict';
    var name = document.getElementById(id);
    switch (id) {
        case 'icona':
            name.src = 'https://openweathermap.org/img/w/' + value + '.png';
            break;
        case 'temp':
            var temp = value - 273.15;
            name.innerText = temp.toFixed(1);
            break;
        case 'wind':
                name.innerText = ' ' + value.speed + ' m/s,  (' + value.deg + ')';
            break;
        case 'sunrise': case 'sunset':
            name.innerText = moment.unix(value).format('kk:mm:ss ');
            break;
        default:
            name.innerText = value;
    }
}