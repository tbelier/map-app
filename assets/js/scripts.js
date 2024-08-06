const map = L.map('map').fitWorld();

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: ''
}).addTo(map);

function onLocationFound(e) {
    const radius = e.accuracy / 2;
    
    const locationMarker = L.marker(e.latlng).addTo(map)
        .bindPopup(`You are within ${radius} meters from this point<br>
                    Your latitude is : ${e.latlng.lat.toFixed(2)}<br>
                    Your longitude is : ${e.latlng.lng.toFixed(2)}`).openPopup();

    const locationCircle = L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
    alert("Activez votre géolocalisation.");
    map.setView([48.8566, 2.3522], 6);
}
var marker;

// Gestion du clic sur la carte
function onMapClick(e) {
    if (marker) {
        map.removeLayer(marker); // Suppression du marqueur existant s'il y en a un
    }
    marker = L.marker(e.latlng).addTo(map); // Ajout d'un nouveau marqueur à l'emplacement du clic
}
map.on('click', onMapClick);
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true});
