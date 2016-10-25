var stickMap = new Waypoint ({
  element: document.getElementById('map'),
  handler: function() {
    var position = $("#map").position();
    //var width = $('#column').width()
    $('#map').addClass('sticky').css("top", position.top).css("left", position.left);
  },
  offset:'25%'
})


var destroyMarker = new Waypoint ({
  element: document.getElementById('removeMarker'),
  handler: function(){
    map.removeLayer(marker);
    lmap.addTo(map); 
  },
  offset:'50%'

})

var removeStick = new Waypoint ({
  element:document.getElementById('removeStick'),
  handler:function(){
    $('#map').removeClass('sticky').css("position", "absolute");
  },
  offset:'50%'

})
