var currentPosition='';
var oldAccess='';
function loadWeather() {
    var weather = new extractWeather();
    var mapProp = {
        center: new google.maps.LatLng(9.00000, 10),
        zoom: 16,
    };
    var map = new google.maps.Map(document.getElementById("mappa"), mapProp);
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    var marker = new google.maps.Marker({
        position: mapProp.center,
        map: map
    });
    loadPosition(); 
    var date = new Date();
    if (localStorage && localStorage['ultimoaccesso']) {
        var oldDate = localStorage['ultimoaccesso'];
    } else {
        var oldDate = "MAI";
    }
    localStorage.setItem('ultimoaccesso', date.toString());
    if (localStorage && localStorage['username']) {
        user = localStorage['username'];
    } else {
        user = 'Mario';
        localStorage['username'] = user;
    }
    oldAccess=user + " ultimo accesso " + oldDate;
    //alert(oldAccess);
}
function loadPosition() { //geolocalizza e restituisce l'indirizzo utilizzando il reverse geocoding
    var coordinate;
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(funzioneOk, funzioneErrore);
    } else {
        alert('non disponibile');
    }
}

function funzioneOk(position) {
    if (position && position.coords) {
        var latitudine = position.coords.latitude;
        var longitudine = position.coords.longitude;
        var mapProp = {
            center: new google.maps.LatLng(latitudine, longitudine),
            zoom: 16,
        };
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({ 'location': mapProp.center }, function (results, status) {
            if (results[1]) {
                currentPosition=results[1].formatted_address;
                alert(currentPosition);// stringa geocoder reverse
            } else {
                alert('No Result');
            }
        });
        //alert("Accuratezza " + position.coords.accuracy + ' metri');
        var map = new google.maps.Map(document.getElementById("mappa"), mapProp);
        var marker = new google.maps.Marker({
            position: mapProp.center,
            map: map
        });
    }
}
function funzioneErrore(error) {
    alert(error.message);
}

function load(id,value){
    //var name = document.getElementById(id);
    if (id === 'image') {
        name.src = value;
    } else { name.innerText = value }
}