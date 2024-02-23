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
                    'icon-size': 1.5,
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
    
    
    
    document.getElementById('Inicio').addEventListener('click', function () {
        // Reset to default map behavior
        map.off(); // Remove all event listeners
    
        // Check if 'edificiosUCLayer' exists before removing
        if (map.getLayer('edificiosUCLayer')) {
            map.removeLayer('edificiosUCLayer');
        }
    
        // Check if 'salasUCLayer' exists before removing
        if (map.getLayer('salasUCLayer')) {
            map.removeLayer('salasUCLayer');
        }
    
        // Check if 'edificiosUCSource' exists before removing
        if (map.getSource('edificiosUCSource')) {
            map.removeSource('edificiosUCSource');
        }
    
        // Check if 'salasUCSource' exists before removing
        if (map.getSource('salasUCSource')) {
            map.removeSource('salasUCSource');
        }
    
        map.on('style.load', () => {
            map.setFog({});
        });
    });
    
    document.getElementById('Edificios').addEventListener('click', function () {
        // Remove 'salasUCLayer' and 'salasUCSource' if they exist
        if (map.getLayer('salasUCLayer')) {
            map.removeLayer('salasUCLayer');
        }
    
        if (map.getSource('salasUCSource')) {
            map.removeSource('salasUCSource');
        }
    
        // Load 'EdificiosUC'
        loadEdificiosUC();
    });
    
    document.getElementById('Salas').addEventListener('click', function () {
        // Remove 'edificiosUCLayer' and 'edificiosUCSource' if they exist
        if (map.getLayer('edificiosUCLayer')) {
            map.removeLayer('edificiosUCLayer');
        }
    
        if (map.getSource('edificiosUCSource')) {
            map.removeSource('edificiosUCSource');
        }
    
        // Load 'SalasUC'
        loadSalasUC();
    });
    
spinGlobe();