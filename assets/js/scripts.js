const map = L.map('map').fitWorld();

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: ''
}).addTo(map);
var OpenSeaMap = L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors'
}).addTo(map);
//Gérer le cas où on se localise
function onLocationFound(e) {
    const radius = e.accuracy / 2;

    const locationMarker = L.marker(e.latlng).addTo(map)
        .bindPopup(`You are within ${radius} meters from this point<br>
                    Your latitude is : ${e.latlng.lat.toFixed(2)}<br>
                    Your longitude is : ${e.latlng.lng.toFixed(2)}`).openPopup();

    const locationCircle = L.circle(e.latlng, radius).addTo(map);
}
//Gérer le cas où on n'arrive pas à se localiser
function onLocationError(e, latRegate) {
    alert("Activez votre géolocalisation.");
    map.setView([48.8566, 2.3522], 6);
}



//Récupérer les paramètres de l'URL
function getURLParameter(nom) {
    nom = nom.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + nom + "=([^&#]*)");
    var résultats = regex.exec(location.search);
    return résultats === null ? "" : decodeURIComponent(résultats[1].replace(/\+/g, " "));
}
//Récupèrer les infos de la régate depuis le serveur grâce à l'id. Puis fait l'affichage des points et change le nom
async function modifyPageFromId(id) {
    fetch('http://localhost:3000/titoudata/' + id)
        .then(res => res.json())
        .then(data => {
            initRegate(data)
        })
}
function initRegate(regate) {
    L.marker({ lat: regate.lat, lng: regate.lon }).addTo(map);
    console.log(regate)
    document.getElementById('inputName').textContent = regate.nom;
    map.setView([regate.lat, regate.lon], 6);
}

var idRegate = getURLParameter('id');
modifyPageFromId(idRegate)

//================= CLICK ON MAP ==============================
//
//=============================================================
let isOriginalFlag = false;
let isBoat = false;
let isFlag = false;
let svgUrl;
let customIcon;
let classNameSvg;
function onMapClick(event) {
    if (isOriginalFlag){
        svgUrl = 'assets/svg/flag-line.svg';
        classNameSvg = "map-original-flag";
    };
    if (isFlag){
        svgUrl = 'assets/svg/flag-2-line.svg';
        classNameSvg = "map-flag";
    };
    if (isBoat){
        svgUrl = 'assets/svg/sailboat-line.svg';
        classNameSvg = "map-boat";
    };
    console.log(svgUrl)
    customIcon = L.icon({
        iconUrl: svgUrl, 
        iconSize: [22, 22], 
        iconAnchor: [3, 20], 
        className: "map-boat",
    });
    let marker = L.marker(event.latlng, { icon: customIcon }).on("click", ()=> {
        map.removeLayer(marker);
    }).addTo(map);
}

document.getElementById("map-original-flag").addEventListener('click', function() {
    console.log("map-original-flag");
    isOriginalFlag = true;
    isBoat = false;
    isFlag = false;
});
document.getElementById("map-flag").addEventListener('click', function() {
    console.log("map-flag");
    isOriginalFlag = false;
    isBoat = false;
    isFlag = true;
});

document.getElementById("map-boat").addEventListener('click', function() {
    console.log("map-boat");
    isOriginalFlag = false;
    isBoat = true;
    isFlag = false;
});


map.on('click', onMapClick);
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.locate({ setView: true });
