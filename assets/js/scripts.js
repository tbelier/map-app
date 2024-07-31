const map = L.map('map').fitWorld();

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
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
    alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 16});
