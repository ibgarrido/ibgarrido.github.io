// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiaWJnYXJyaWRvIiwiYSI6ImNsc3h4ZWViMTA3eHEyanBtcDllbHFsbWcifQ.MSSn7vU0DEMpaS9xfRn6mQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
    zoom: 16,
    center: [-70.61139890318891, -33.4983298247388] // Starting position [lng, lat] , 
});


var popup = new mapboxgl.Popup(); // Create a single popup instance

/*Edificios UC*/
function loadEdificiosUC() {
    map.on('style.load', () => {
        map.setFog({});
    });
    map.addSource('edificiosUCSource', {
        type: 'geojson',
        data: 'edificiosUC.geojson'
    });

    map.addLayer({
        id: 'edificiosUCLayer',
        type: 'fill',
        source: 'edificiosUCSource',
        paint: {
            'fill-color': 'gray',
            'fill-opacity': 0.5
        }
    });

    // Add tooltip on hover for EdificiosUC
    map.on('mouseenter', 'edificiosUCLayer', function (e) {
        var coordinates = e.lngLat;
        var properties = e.features[0].properties;

        // Set the HTML content of the popup
        popup.setLngLat(coordinates)
            .setHTML('<h3>' + (properties.name) + '</h3>')
            .addTo(map);
    });

    // Remove tooltip on mouse leave
    map.on('mouseleave', 'edificiosUCLayer', function () {
        popup.remove(); // Close the popup
    });
}

/*Salas UC*/
function loadSalasUC() {
    // Check if 'SalasUCSource' exists before adding
    if (!map.getSource('SalasUCSource')) {
        map.addSource('SalasUCSource', {
            type: 'geojson',
            data: 'salasUC.geojson'
        });
    }

    // Check if 'salasUCLayer' exists before adding
    if (!map.getLayer('salasUCLayer')) {
        map.addLayer({
            id: 'salasUCLayer',
            type: 'symbol',
            source: 'SalasUCSource',
            layout: {
                'icon-image': 'marker-15',
                'icon-size': 2,
                'text-field': ['get', 'classroom'],
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.8], // Adjust the offset to prevent overlapping text
                'text-anchor': 'top',
                'text-size': {
                    stops: [
                        [12, 10], // Font size at zoom level 12
                        [13, 11]  // Font size at zoom level 18
                        // Add more stops as needed
                    ]
                }
            }
        });
    }
    
}

/*AGUA Potable Purificda UC*/
function loadAguasUC() {
    // Check if 'AguasUCSource' exists before adding
    if (!map.getSource('AguasUCSource')) {
        map.addSource('AguasUCSource', {
            type: 'geojson',
            data: 'aguasUC.geojson'
        });
    }

    // Check if 'aguasUCLayer' exists before adding
    if (!map.getLayer('aguasUCLayer')) {
        map.addLayer({
            id: 'aguasUCLayer',
            type: 'circle', // Change type to 'circle' for point data
            source: 'AguasUCSource',
            paint: {
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    12, 10, // Circle radius at zoom level 12
                    13, 11  // Circle radius at zoom level 13
                ],
                'circle-color': ['get', 'marker-color'], // Color circles by 'color' property
                'circle-opacity': 0.8, // Customize opacity as needed
                'circle-stroke-width': 1,
                'circle-stroke-color': '#ffffff', // Customize stroke color if needed
                'circle-radius': 6,
                
            }
        });

        map.addLayer({
            id: 'aguasUCLayerSymbol',
            type: 'symbol',
            source: 'AguasUCSource',
            layout: {
                'text-field': ['get', 'name'],
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.8], // Adjust the offset to prevent overlapping text
                'text-anchor': 'top',
                'text-size': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    12, 10, // Text size at zoom level 12
                    13, 11  // Text size at zoom level 13
                ]
            }
        });
    }
}



function loadComidaUC() {
    // Check if 'ComidaUCSource' exists before adding
    if (!map.getSource('ComidaUCSource')) {
        map.addSource('ComidaUCSource', {
            type: 'geojson',
            data: 'ComidaUC.geojson'
        });
    }

    // Check if 'comidaUCLayer' exists before adding
    if (!map.getLayer('comidaUCLayer')) {
        map.addLayer({
            id: 'comidaUCLayer',
            type: 'circle', // Change type to 'circle' for point data
            source: 'ComidaUCSource',
            paint: {
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    12, 10, // Circle radius at zoom level 12
                    13, 11  // Circle radius at zoom level 13
                ],
                'circle-color': ['get', 'marker-color'], // Color circles by 'color' property
                'circle-opacity': 0.8, // Customize opacity as needed
                'circle-stroke-color': '#ffffff', // Customize stroke color if needed
                'circle-radius': 6,
                'circle-stroke-width': 1,
            },
            
        });

        map.addLayer({
            id: 'comidaUCLayerSymbol',
            type: 'symbol',
            source: 'ComidaUCSource',
            layout: {
                'text-field': ['get', 'name'],
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.8], // Adjust the offset to prevent overlapping text
                'text-anchor': 'top',
                'text-size': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    12, 10, // Text size at zoom level 12
                    13, 11  // Text size at zoom level 13
                ]
            }
        });
    }
    map.on('mouseenter', 'comidaUCLayer', function (e) {
        var coordinates = e.lngLat;
        var properties = e.features[0].properties;

        // Set the HTML content of the popup
        popup.setLngLat(coordinates)
            .setHTML('<h3>' +'Acepta Sodexo: '+ (properties.sodexo) + '</h3>')
            .addTo(map);
    });

    // Remove tooltip on mouse leave
    map.on('mouseleave', 'comidaUCLayer', function () {
        popup.remove(); // Close the popup
    });
}

function loadBañosUC() {
    // Check if 'BañosUCSource' exists before adding
    if (!map.getSource('BañosUCSource')) {
        map.addSource('BañosUCSource', {
            type: 'geojson',
            data: 'bañosUC.geojson'
        });
    }

    // Check if 'bañosUCLayer' exists before adding
    if (!map.getLayer('bañosUCLayer')) {
        map.addLayer({
            id: 'bañosUCLayer',
            type: 'circle', // Change type to 'circle' for point data
            source: 'BañosUCSource',
            paint: {
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    12, 10, // Circle radius at zoom level 12
                    13, 11  // Circle radius at zoom level 13
                ],
                'circle-color': ['get', 'marker-color'], // Color circles by 'color' property
                'circle-opacity': 0.8, // Customize opacity as needed
                'circle-stroke-color': '#ffffff', // Customize stroke color if needed
                'circle-radius': 6,
                'circle-stroke-width': 1,
            }
        });

        map.addLayer({
            id: 'bañosUCLayerSymbol',
            type: 'symbol',
            source: 'BañosUCSource',
            layout: {
                'text-field': ['get', 'name'],
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.8], // Adjust the offset to prevent overlapping text
                'text-anchor': 'top',
                'text-size': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    12, 10, // Text size at zoom level 12
                    13, 11  // Text size at zoom level 13
                ]
            }
        });
    }
    map.on('mouseenter', 'bañosUCLayer', function (e) {
        var coordinates = e.lngLat;
        var properties = e.features[0].properties;

        // Set the HTML content of the popup
        popup.setLngLat(coordinates)
            .setHTML('<h3>' + 'Minusvalido: '+ (properties.handicap) + '</h3>')
            .addTo(map);
    });

    // Remove tooltip on mouse leave
    map.on('mouseleave', 'bañosUCLayer', function () {
        popup.remove(); // Close the popup
    });
}





document.getElementById('Inicio').addEventListener('click', function () {
   removePreviousLayer();
});

document.getElementById('Edificios').addEventListener('click', function () {
    removePreviousLayer();
    loadEdificiosUC();
});

document.getElementById('Salas').addEventListener('click', function () {
    removePreviousLayer();
    loadSalasUC();
});

document.getElementById('Agua').addEventListener('click', function () {
    removePreviousLayer();
    loadAguasUC(); 
});

document.getElementById('Comida').addEventListener('click', function () {
    removePreviousLayer();
    loadComidaUC(); 
});

document.getElementById('Baños').addEventListener('click', function () {
    removePreviousLayer();
    loadBañosUC(); 
});

document.getElementById('Reciclaje').addEventListener('click', function () {
});

// Remove previous layers.
function removePreviousLayer() {
    map.off(); // Remove all event listeners


    if (map.getLayer('edificiosUCLayer')) {
        map.removeLayer('edificiosUCLayer');
    }

    if (map.getSource('edificiosUCSource')) {
        map.removeSource('edificiosUCSource');
    }


    if (map.getLayer('salasUCLayer')) {
        map.removeLayer('salasUCLayer');
    }

    if (map.getSource('salasUCSource')) {
        map.removeSource('salasUCSource');
    }

    if (map.getLayer('aguasUCLayer')) {
        map.removeLayer('aguasUCLayer');
    }

    if (map.getLayer('aguasUCLayerSymbol')) {
        map.removeLayer('aguasUCLayerSymbol');
    }

    if (map.getSource('AguasUCSource')) {
        map.removeSource('AguasUCSource');
    }

    if (map.getLayer('comidaUCLayer')) {
        map.removeLayer('comidaUCLayer');
    }

    if (map.getLayer('comidaUCLayerSymbol')) {
        map.removeLayer('comidaUCLayerSymbol');
    }

    if (map.getSource('ComidaUCSource')) {
        map.removeSource('ComidaUCSource');
    }

    if (map.getLayer('bañosUCLayer')) {
        map.removeLayer('bañosUCLayer');
    }

    if (map.getLayer('bañosUCLayerSymbol')) {
        map.removeLayer('bañosUCLayerSymbol');
    }

    if (map.getSource('BañosUCSource')) {
        map.removeSource('BañosUCSource');
    }
    map.on('style.load', () => {
        map.setFog({});
    });
}