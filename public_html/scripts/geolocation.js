//GLOBALS

var _ = require(['underscore'], function (underscore){});
var mylat;
var mylon;
var arr = document.querySelectorAll(".distances");
var arr2 = document.querySelectorAll(".ordered");

var località = {
  "Parigi"  : {"name": "Parigi", "lat": 48.856614, "lon":  2.3522219},
  "Praga" : {"name": "Praga","lat": 50.0755381,"lon": 14.4378005},
  "Campiglio" : {"name": "Campiglio","lat": 46.2302584,"lon": 10.826401},
  "Londra"  : {"name": "Londra", "lat": 51.5073509, "lon": -0.1277583},
  "Zante" : {"name": "Zante", "lat": 37.7875637, "lon": 20.8978593}
};

//FUNCTIONS

/**
 * @return {string}
 */
function CalcolaDistanza(mylat,mylon,lat,lon){

  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  };

  var R = 6371; // km
  var x1 = mylat-lat;
  var dLat = x1.toRad();
  var x2 = mylon-lon;
  var dLon = x2.toRad();
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(lat.toRad()) * Math.cos(mylat.toRad()) *
  Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = (R * c).toFixed(1);

  return d;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else
    alert("Geolocation is not supported by this browser.");
}

function showPosition(position) {
  var mapholder = document.getElementById('mapholder');
  var mapcanvas = document.createElement('div');
  mapcanvas.id = 'mapcontainer';
  mapcanvas.style.height = '250px';
  mapcanvas.style.width = '300px';

  mapholder.appendChild(mapcanvas);

  var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var options = {
    zoom: 15,
    center: coords,
    mapTypeControl: false,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.SMALL
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById('mapcontainer'), options);

  var marker = new google.maps.Marker({
    position: coords,
    map: map,
    title:"You are here!"
  });

  mylat = position.coords.latitude;
  mylon = position.coords.longitude;

  //Scorro tutte le località, calcolando la distanza dalla posizione attuale e inserendo
  //una nuova proprietà "distance" all'array delle località

  _.each(località,function(località){
    return  località.distance = CalcolaDistanza(mylat,mylon,località.lat,località.lon);
  });

  var j=0;

  _.each(località,function(località){
    return  arr[j++].innerHTML = località.name + " : " + località.distance + " Km";
  });

}

function SortPlaces(){
  var sortedlist = _.sortBy(località,function(località){return Math.floor(località.distance)});
  var k=0;

  _.each(sortedlist,function(sortedlist){
    return  arr2[k++].innerHTML = sortedlist.name + " : " + sortedlist.distance + " Km";
  });
}
