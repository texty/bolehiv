//initialize map
var map = L.map('map', {scrollWheelZoom:false}).setView([49.066944, 23.851389], 14);

// add base map
var CartoDB_PositronNoLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 17
      }).addTo(map);


//add marker
//var marker = L.popup().setLatLng([49.066944, 23.851389]).setContent("Болехів").openOn(map);

//add points
var lmap = new L.LayerGroup();

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
             layer.bindPopup('<b>' + feature.properties.name + '</b>' + '<br>' + feature.properties.address);
           }
         }).addTo(lmap);
       });

lmap.addTo(map);

// var licenses = L.geoJson();
//     licenses.addTo(map);
//
// $.ajax({
// dataType: "json",
// url: "data/bolehiv.geojson",
// success: function(data) {
//     $(data.features).each(function(key, data) {
//         licenses.addData(data);
//     });
// }
// }).error(function() {});

//add legend
