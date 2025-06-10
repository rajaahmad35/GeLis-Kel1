let map;
let layers = {};
let editingId = null;

function initializeMap() {
    map = L.map('map').setView([-7.2918517, 110.7510066], 15);
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    layers = {
        'Bidang Tanah': L.geoJSON(null, { style: { color: 'blue', fillOpacity: 0.5 } }),
        'Zona Nilai Tanah': L.geoJSON(null, { style: { color: 'purple', fillOpacity: 0.5 } }),
        'WMS Bidang Tanah': L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
            layers: "Bidang Tanah",
            format: "image/png",
            transparent: true,
            attribution: "GeoServer WMS"
        }),
        'WMS Admin Genengsari': L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
            layers: "admin_genengsari",
            format: "image/png",
            transparent: true,
            attribution: "GeoServer WMS"
        }),
        'WMS Jaringan Jalan': L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
            layers: "Jaringan Jalan",
            format: "image/png",
            transparent: true,
            attribution: "GeoServer WMS"
        }),
        'WMS Sungai': L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
            layers: "Sungai",
            format: "image/png",
            transparent: true,
            attribution: "GeoServer WMS"
        }),
        'WMS Harga Tanah': L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
            layers: "Harga Tanah",
            format: "image/png",
            transparent: true,
            attribution: "GeoServer WMS"
        })
    };
    landData.forEach(data => {
        L.marker([data.lat, data.lng]).addTo(map)
            .bindPopup(`NIB: ${data.nib}<br>Harga: ${data.harga}<br>Status: ${data.status}`)
            .on('click', () => highlightLand(data.nib));
    });
    const baseLayers = {
        "OpenStreetMap": osm
    };
    const overlays = {
        "Bidang Tanah": layers['WMS Bidang Tanah'],
        "Admin Genengsari": layers['WMS Admin Genengsari'],
        "Jaringan Jalan": layers['WMS Jaringan Jalan'],
        "Sungai": layers['WMS Sungai'],
        "Harga Tanah": layers['WMS Harga Tanah']
    };
    L.control.layers(baseLayers, overlays, { position: 'topright' }).addTo(map);
    layers['WMS Bidang Tanah'].addTo(map);
    layers['WMS Admin Genengsari'].addTo(map);
    layers['WMS Jaringan Jalan'].addTo(map);
    layers['WMS Sungai'].addTo(map);
    layers['WMS Harga Tanah'].addTo(map);
    L.control.scale().addTo(map);
    L.marker([-7.2918517, 110.7510066]).addTo(map)
        .bindPopup('Genengsari<br>Lat: -7.2918517, Long: 110.7510066')
        .openPopup();
}

function searchLocation() {
    const query = document.getElementById('search').value.trim();
    const resultDiv = document.getElementById('search-result');
    const matchedData = landData.find(data => data.nib === query);
    if (matchedData) {
        resultDiv.innerHTML = `Ditemukan: NIB ${matchedData.nib}, Pemilik: ${matchedData.pemilik}, Harga: ${matchedData.harga}`;
        map.setView([matchedData.lat, matchedData.lng], 15);
        highlightLand(matchedData.nib);
    } else {
        resultDiv.innerHTML = 'NIB tidak ditemukan.';
    }
}

function highlightLand(nib) {
    const matchedData = landData.find(data => data.nib === nib);
    if (matchedData) {
        if (map.highlightedMarker) {
            map.removeLayer(map.highlightedMarker);
        }
        map.highlightedMarker = L.marker([matchedData.lat, matchedData.lng], { icon: L.divIcon({ className: 'highlight-marker', html: '▲' }) }).addTo(map)
            .bindPopup(`NIB: ${matchedData.nib}<br>Harga: ${matchedData.harga}<br>Status: ${matchedData.status}`)
            .openPopup();
    }
}