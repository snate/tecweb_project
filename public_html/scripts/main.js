// GLOBALS

var geo = require(['geolocation'], function (geolocation){});
var searchbar = document.getElementById('place');
var loc = document.getElementById('current_page');
var userIn=document.getElementById('user');
var commentIn=document.getElementById('comment');
var formIn=document.getElementById('formcompl');
var annullaIn=document.getElementById('annulla');
var nuovoIn=document.getElementById('new_comment');

//FUNCTIONS

window.onload = load;

function load(){  //ho dovuto rinominare la funzione a causa di conflitti con altre libs
	search();
	if(loc!=null){
		visualizza_c();
		nuovoIn.onclick=visualizza_form;
		userIn.onblur=blurUser;
		commentIn.onblur=blurComment;
		formIn.onsubmit=clickSubmit;
		annullaIn.onclick=delAll;
	}
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


/*Script commenti degli utenti*/

function visualizza_c(){
  loc = loc.innerHTML.trim().toLowerCase();
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

function visualizza_form(){
	formIn.setAttribute('class', "");	
}

function blurUser(){
	if(!checkUser()){
		document.getElementById('err_user').innerHTML="Inserire uno username";
	}
	else{
		document.getElementById('err_user').innerHTML="";
	}
};

function checkUser(){
	var user=document.getElementById('user').value;
	if (user==""){
		return false;
	}
	else{
		return true;
	}
};

function blurComment(){
	if(!checkComment()){
		document.getElementById('err_comment').innerHTML="E' obbligatorio inserire un testo per il commento";
	}
	else{
		document.getElementById('err_comment').innerHTML="";
	}
};

function checkComment(){
	var comment=document.getElementById('comment').value;
	if (comment==""){
		return false;
	}
	else{
		return true;
	}
};

function clickSubmit(){
	var corretto=checkAll();
	if(corretto)
		return true;
	alert('Impossibile inviare il commento.\n Controllare i dati immessi.');
	doAll();
	return false;
};

function checkAll(){
	return checkUser() && checkComment();
};

function doAll(){
	blurUser();
	blurComment();
};

/*si occupa di cancellare non solo i campi ma anche i messaggi di errore*/
function delAll(){
	document.getElementById('err_user').innerHTML="";
	document.getElementById('err_comment').innerHTML="";
	formIn.setAttribute('class', "hidden");
	return true;
}

