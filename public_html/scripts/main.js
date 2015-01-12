// GLOBALS

var geo = require(['geolocation'], function (geolocation){});
var searchbar = document.getElementById('place');

//FUNCTIONS

window.onload = load;

function load(){  //ho dovuto rinominare la funzione a causa di conflitti con altre libs
  search();
};

function search(){
  searchbar.value = "Nome località";
  searchbar.holder = true;
  searchbar.oldClass = searchbar.className;   //salvo vecchia classe (estensibilità)
  searchbar.className += " emphasized";
  searchbar.onfocus = searchFocus;            //assegno cosa fare onfocus
  searchbar.onblur = searchBlur;
};

function searchFocus(){
  if(searchbar.holder) {
    searchbar.value = "";
    searchbar.className = searchbar.oldClass;
  }
};

function searchBlur(){
  if(searchbar.value == "") {
    searchbar.value = "Nome località";
    searchbar.className += " emphasized";
    searchbar.holder = true;
  } else
    searchbar.holder = false;
};
