// GLOBALS

var geo = require(['geolocation'], function (geolocation){});
var searchbar = document.getElementById('place');
var loc = document.getElementById('nav_selected').innerHTML.trim().toLowerCase();

//FUNCTIONS

window.onload = load;

function load(){  //ho dovuto rinominare la funzione a causa di conflitti con altre libs
  search();
  visualizza_c();
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

function visualizza_c(){
  xml=loadXMLDoc("dati/commenti.xml");
  xsl=loadXMLDoc("dati/commenti.xsl");
  if (window.ActiveXObject || // codice per IE
      xhttp.responseType == "msxml-document") {
    text = xml.transformNode(xsl);
    content=text.getElementById("nome_"+loc);
    document.getElementById("comments").innerHTML = content;
  } // codice per Chrome, Firefox, Opera, etc.
  else if (document.implementation &&
      document.implementation.createDocument){
    xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);
    text= xsltProcessor.transformToFragment(xml, document);
    content=text.getElementById("nome_"+loc);
    document.getElementById("comments").appendChild(content);
  }
};

function loadXMLDoc(file){
  if (window.ActiveXObject){
    xhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } else {
    xhttp = new XMLHttpRequest();
  }
  xhttp.open("GET", file, false);
  try { xhttp.responseType = "msxml-document"} catch(err) {}
  // aiuto per IE11
  xhttp.send("");
  return xhttp.responseXML;
};
