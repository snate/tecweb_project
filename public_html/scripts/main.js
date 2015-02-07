// GLOBALS

var geo;
var searchbar;
var loca;
var userIn;
var commentIn;
var formIn;
var annullaIn;
var nuovoIn;
var visualizzaIn;
var nascondiIn;
var spanErrUser;
var spanErrComm;
var linkU;
var linkG;
var f=true;
var menuM;
var searchM;

//FUNCTIONS

window.onload = load;

function load(){  //ho dovuto rinominare la funzione a causa di conflitti con altre libs
  if(document.getElementById("geodata") != null)
    geo = require(['geolocation'], function (geolocation){});
  init();
  search();
  homeLink();
  menuM.onclick=mobileMenu;
  searchM.onclick=mobileSearch;
  if(loca!=null){
    insertDate();
    loca = loca.innerHTML;
    var nomeLoc = loca.trim().toLowerCase();
    visualizzaIn.onclick=visualizza_c;
    nascondiIn.onclick=nascondi_c;
    nuovoIn.onclick=visualizza_form;
    userIn.onblur=blurUser;
    commentIn.onblur=blurComment;
    formIn.onsubmit=clickSubmit;
    annullaIn.onclick=delAll;
    extLink();
    colorButtons();
  }
}

function init() {
  searchbar = document.getElementById('place');
  loca = document.getElementById('current_page');
  userIn=document.getElementById('user');
  commentIn=document.getElementById('comment');
  formIn=document.getElementById('formcompl');
  annullaIn=document.getElementById('annulla');
  nuovoIn=document.getElementById('new_comment');
  visualizzaIn=document.getElementById('see_comments');
  nascondiIn=document.getElementById('hide_comments');
  spanErrUser = document.getElementById('err_user');
  spanErrComm = document.getElementById('err_comment');
  linkU = document.getElementById('utility');
  linkG = document.getElementById('government');
  menuM = document.getElementById('menu-trigger');
  searchM = document.getElementById('searchbar-trigger');
}

function insertDate(){
	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();
	var newdate = year + "-" + month + "-" + day;
	document.getElementById("pubdate").value = newdate;
}

function search(){
	searchbar.value = "Nome località";
	searchbar.holder = true;
	searchbar.oldClass = searchbar.className;   //salvo vecchia classe (estensibilità)
	searchbar.className += " emphasized";
	searchbar.onfocus = searchFocus;            //assegno cosa fare onfocus
	searchbar.onblur = searchBlur;
}

function homeLink() {
	var linksH = document.getElementsByTagName("h1");
	for(var i = 0; i < linksH.length; i++) {
		if (linksH[i].getAttribute("class") == 'homepanel')  {
			linksH[i].onclick = function(){
				window.open(this.getElementsByTagName("a")[0].getAttribute("href"),"_self");
			}
		}
	}
}

function extLink() {
	var linksG = linkG.getElementsByTagName("a");
	var linksU = linkU.getElementsByTagName("a");
  var descrLoc = document.getElementById("descr_loc");
  var linksL = descrLoc.getElementsByTagName("a");
	for(var i = 0; i < linksU.length; i++) {
		linksU[i].onclick = function(){
			popUp(this.getAttribute("href"));
			return false;
		}
	}
  for(var j = 0; j < linksG.length; j++) {
    linksG[j].onclick = function(){
      popUp(this.getAttribute("href"));
      return false;
    }
  }
  for(var k = 0; k < linksL.length; k++) {
    linksL[k].onclick = function(){
      popUp(this.getAttribute("href"));
      return false;
    }
  }
}

function popUp(url) {
	window.open(url,'_blank');
}

function colorButtons() {
  visualizzaIn.className = "com-runnable";
  nuovoIn.className = "com-runnable";
  nascondiIn.className = "com-notrunnable";
}

function searchFocus(){
	if(searchbar.holder) {
		searchbar.value = "";
		searchbar.className = searchbar.oldClass;
	}
}

function searchBlur(){
	if(searchbar.value == "") {
		searchbar.value = "Nome località";
		searchbar.className += " emphasized";
		searchbar.holder = true;
	} else
		searchbar.holder = false;
}

function createCookie(name, value, days) {
    var expires;
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    }
    else {
      expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) {
          c_end = document.cookie.length;
        }
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return "";
}

function mobileMenu() {
  var menu = document.getElementById("main-menu");
  if(menu == null)
    menu = document.getElementById("nav");
  if(menu.className == "m-attivo")
    menu.removeAttribute("class");
  else
    menu.className = "m-attivo";
}

function mobileSearch() {
  var cerca = document.getElementById("search");
	if (cerca.className == "s-attiva")
    cerca.removeAttribute("class");
  else
    cerca.className = "s-attiva";
}

/*Script commenti degli utenti*/
function visualizza_c(){
	if(f){
    document.getElementById('visualizza_commenti').setAttribute('class',"");
		if (window.ActiveXObject || "ActiveXObject" in window) {
			error_content = document.createElement("div");
			error_content.innerHTML = "Spiacenti non siamo in grado di visualizzare i commenti per il tuo browser";
			padre=document.getElementById("visualizza_commenti");
			if(padre.childElementCount==0)
				padre.appendChild(error_content);
			return;
		}
		xml=loadXMLDoc("cgi-bin/commenti.xml");
		xsl=loadXMLDoc("cgi-bin/commenti.xsl");
		if (document.implementation &&
			  document.implementation.createDocument){
			xsltProcessor = new XSLTProcessor();
			xsltProcessor.importStylesheet(xsl);
			text= xsltProcessor.transformToFragment(xml, document);
			nomeLoc = loca.trim().toLowerCase();
			nomeLoc = getNome(nomeLoc);
      content = text.querySelector("#commenti_"+nomeLoc);
			if(content.innerHTML == "") {
				content = document.createElement("div");
        if(document.getElementById("visualizza_commenti").childElementCount == 0)
				  content.innerHTML = "Non ci sono commenti da visualizzare";
			}
      content.dim = content.childElementCount;
      content.shown = 0;
      for(var i = 0; i < content.childNodes.length; i++) {
        content.childNodes[i].className = "hidden";
      }
      showSome(content);
			document.getElementById("visualizza_commenti").appendChild(content);
		}
    f=false;
	}
  else
    showSome(content);
}

function showSome(content) {
  for(var i = 0; i < 2; i++)
    if(content.shown < content.dim) {
      content.childNodes[content.shown].className = "";
      content.shown++;
      nascondiIn.className = "com-runnable";
    }
  if(content.shown < content.dim) {
    visualizzaIn.value = "Visualizza altri commenti";
    visualizzaIn.className = "com-running"
  }
  else {
    visualizzaIn.value = "Non ci sono altri commenti da visualizzare";
    visualizzaIn.className = "com-notrunnable";
  }
}

function getNome(loca) {
	var locNomi = {"londra":"london","madonna di campiglio":"madonnadicampiglio","zante":"zakynthos","praga":"praga","parigi":"paris"};
	return locNomi[loca];
}

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
}

function nascondi_c(){
  if(typeof nomeLoc == 'undefined') return;
	var vis_com=document.getElementById('visualizza_commenti');
	var com= document.getElementById("commenti_"+nomeLoc);
  if(com != null)
    vis_com.removeChild(com);
	f=true;
  visualizzaIn.value = "Visualizza commenti";
  if(content != "")
    visualizzaIn.className = "com-runnable";
  nascondiIn.className = "com-notrunnable";
}

function visualizza_form(){
  if(getCookie("username"))
    userIn.value = getCookie("username");
	formIn.setAttribute('class', "");
  nuovoIn.className = "com-running";
}

function blurUser(){
	if(!checkUser()){
		spanErrUser.innerHTML="Inserire uno username";
					spanErrUser.className="";
				}
				else{
					spanErrUser.innerHTML="";
					spanErrUser.className="hidden";
				}
			}

function checkUser(){
	var user=document.getElementById('user').value;
	return user != "";
}

function blurComment(){
	if(!checkComment()){
		spanErrComm.innerHTML="E' obbligatorio inserire un testo per il commento";
		spanErrComm.className="";
	}
	else{
		spanErrComm.innerHTML="";
		spanErrComm.className="hidden";
	}
}

function checkComment(){
	var comment=document.getElementById('comment').value;
	return comment != "";
}

function clickSubmit(){
	var corretto=checkAll();
	if(corretto) {
    createCookie("username",userIn.value,15);
		alert("Inserimento avvenuto correttamente");
		return true;
	}
	alert('Impossibile inviare il commento.\n Controllare i dati immessi.');
	doAll();
	return false;
}

function checkAll(){
	return checkUser() && checkComment();
}

function doAll(){
	blurUser();
	blurComment();
}

/*si occupa di cancellare non solo i campi ma anche i messaggi di errore*/
function delAll(){
	document.getElementById('err_user').innerHTML="";
	document.getElementById('err_comment').innerHTML="";
	formIn.setAttribute('class', "hidden");
	return true;
}
