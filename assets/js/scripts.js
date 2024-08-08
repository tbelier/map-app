const map = L.map('map').fitWorld();

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: ''
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
var marker;

// Déplace l'icon sous la souris
function onMapClick(e) {
    if (marker) {
        map.removeLayer(marker); // Suppression du marqueur existant s'il y en a un
    }
    marker = L.marker(e.latlng).addTo(map); // Ajout d'un nouveau marqueur à l'emplacement du clic
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
function initRegate(regate){
    L.marker({ lat: regate.lat, lng: regate.lon }).addTo(map);
    console.log(regate)
    document.getElementById('inputName').textContent = regate.nom;
    map.setView([regate.lat, regate.lon], 6);
}

var idRegate = getURLParameter('id');
modifyPageFromId(idRegate)

map.on('click', onMapClick);
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.locate({ setView: true });
