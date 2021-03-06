//initialize map
var map = L.map('map', {scrollWheelZoom:false}).setView([49.066959, 23.859401], 14);

// add base map
var CartoDB_PositronNoLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 17
      }).addTo(map);

//add licenses points
$.getJSON("data/bolehiv.geojson", function(data){

//define style
  function style(feature) {
    return {
      radius: 6,
      fillColor: '#5B7C8A',
      color: '#FEFFEA',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.75
      };
    }

    L.geoJson(data, {
          pointToLayer: function(feature, latlng){
            return L.circleMarker(latlng, style(feature));
           },
           onEachFeature: function (feature, layer) {
             layer.bindPopup('<b>' + feature.properties.name.toUpperCase() + '</b>' + '<br><hr>' + feature.properties.address + '<br>' + 'номер ліцензії: ' + feature.properties.number.bold() + '<br>' + 'дійсна до ' + feature.properties.to.bold());
           }
         }).addTo(map);
       });

// add illegal points
$.getJSON("data/bolehiv_illegal.geojson", function(data){

//define style
  function style(feature) {
    return {
      radius: 6,
      fillColor: '#d3c756',
      color: '#FEFFEA',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.75
      };
    }

    L.geoJson(data, {
          pointToLayer: function(feature, latlng){
            return L.circleMarker(latlng, style(feature));
           },
           onEachFeature: function (feature, layer) {
             layer.bindPopup('<b>' + feature.properties.name.toUpperCase() + '</b>' + '<br><hr>' + feature.properties.address + '<br>' + feature.properties.description);
           }
         }).addTo(map);
       });


//add legend
var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        colors = ['#d3c756', '#327C8C'],
        labels = ['місця без ліцензії', 'місця з ліцензією'];
    for (var i = 0; i < colors.length; i++) {
        div.innerHTML += '<i class="fa fa-circle" aria-hidden="true" style="color:' + colors[i] + '"></i> ' + labels[i] + '<br>';
          }
    return div;
    };

map.addControl(legend);
