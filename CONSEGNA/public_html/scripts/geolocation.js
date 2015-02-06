// GLOBALS
var _ = require(['underscore'], function (underscore){});

var mylat;
var mylon;
var geodata = document.getElementById('geodata');
var mapholder = document.getElementById('mapholder');
var elencoLoc = new Array();
var mapMarkers = new Array();

// flag per riconoscere in che tipo di pagina ci troviamo (località o sezione mare,città..)
var flag = document.getElementById("content") ? true : false;

var titleloc = flag ? document.getElementById("content").childNodes[1].innerHTML : document.getElementById("descr_loc").childNodes[5].innerHTML
var locname = titleloc.replace(/\s/g, '');

var località = {
  "Parigi"  : {"name": "Parigi","loc":"Città","lat": 48.856614, "lon":  2.3522219},
  "Praga" : {"name": "Praga","loc":"Città","lat": 50.0755381,"lon": 14.4378005},
  "Campiglio" : {"name": "Madonna di Campiglio","loc":"Montagna","lat": 46.2302584,"lon": 10.826401},
  "Londra"  : {"name": "Londra","loc":"Città","lat": 51.5073509, "lon": -0.1277583},
  "Zante" : {"name": "Zante","loc":"Mare","lat": 37.7875637, "lon": 20.8978593}
};
// FUNCTIONS
// Funzione per il calcolo delle distanze che utilizza la formula dell'emisenoverso.

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
};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }else
    alert("La geolocalizzazione non è supportata da questo browser.");
  };
  
  function showPosition(position) {
    var mapcanvas = document.createElement('div');
    mapcanvas.id = 'mapcontainer';
    mapcanvas.style.height = '100%';
    mapcanvas.style.width = '100%';
    mapholder.style.display = "block";
    mapholder.appendChild(mapcanvas);
    var geodl = document.createElement('ul');
    geodata.appendChild(geodl);

    if(!flag){
      var currentpage = document.getElementById('current_page').innerHTML;
      var currentloc = null;
      for(var loc in località)
	if(currentpage == località[loc].name)
	  currentloc = località[loc];
      var pagecoords = new google.maps.LatLng(currentloc.lat,currentloc.lon);
    }else
      var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var options = {
        zoom: flag ? 3 : 10,
        center: flag? coords : pagecoords,
        mapTypeControl: false,
        navigationControlOptions: {
          style: google.maps.NavigationControlStyle.SMALL
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById('mapcontainer'), options);

      var mymarker = new google.maps.Marker({
        position: flag ? coords : pagecoords,
        map: map
      });

      google.maps.event.addListener(mymarker, 'click', function() {
        infowindow = new google.maps.InfoWindow({
          content: flag ? "Sono qui!": currentloc.name
        });
        infowindow.open(map, mymarker);
      });

      mylat = position.coords.latitude;
      mylon = position.coords.longitude;

      filteredloc = new Array();
      for(loc in località)
	if(locname == località[loc].loc)
	  filteredloc.push(località[loc]);

      // Appendo i Google Marker per le località filtrate.
      if(flag){
	for(var i=0; i < filteredloc.length; i++) {
	  var marker = new google.maps.Marker({
            position: new google.maps.LatLng(filteredloc[i].lat, filteredloc[i].lon),
            map: map,
            nomeLoc: filteredloc[i].name
          });
	  mapMarkers.push(marker);
	  elencoLoc[marker.indexLoc] = i;
	}
	for(var i=0; i < mapMarkers.length; i++) {
          google.maps.event.addListener(mapMarkers[i], 'click', function() {
	    infowindow = new google.maps.InfoWindow({
	      content: this.nomeLoc
            });
            infowindow.open(map, this);
          });
	}
      }
      // Creo per ogni località filtrata un elemento "p" e lo appendo al div "geodata".
      // In questo modo aggiungendo altre località all'oggetto "località" gli elementi su pagina verranno
      // creati dinamicamente.
      if(flag){
	for(var i=0; i < filteredloc.length; i++)
	  geodl.appendChild(document.createElement('li'));
      }else
        geodl.appendChild(document.createElement('li'));

        // Scorro tutte le località filtrate, calcolando la distanza dalla posizione attuale e inserendo
        // una nuova proprietà "distance" all'array delle località filtrate.
	for(var i=0; i < filteredloc.length; i++)
	  filteredloc[i].distance = CalcolaDistanza(mylat,mylon,filteredloc[i].lat,filteredloc[i].lon);

        // Creo un array con le località riordinate per distanza minore dalla posizione attuale.
	sortedlist = filteredloc.slice(0);
	sortedlist.sort(function(a, b){
	  var distA = Math.floor(a.distance);
	  var distB = Math.floor(b.distance);
	  if(distA < distB) return -1;
	  if(distA > distB) return 1;
	  return 0;
	});

        // Scorro l'array delle località riordinate ed inserisco i valori nella pagina HTML.
        if(flag){
          var k=0;
	  for(var i=0; i < sortedlist.length; i++)
	    geodl.childNodes[i].innerHTML = sortedlist[i].name + ": " + sortedlist[i].distance + " Km";
        }else
          geodl.childNodes[0].innerHTML = currentloc.name + " è lontana " + currentloc.distance + " Km da te.";
        };

        getLocation();
