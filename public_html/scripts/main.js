// GLOBALS

var geo;
var searchbar;
var loc;
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

//FUNCTIONS

window.onload = load;

function load(){  //ho dovuto rinominare la funzione a causa di conflitti con altre libs
  init();
	search();
	homeLink();
	if(loc!=null){
		insertDate();
    	loc = loc.innerHTML;
    	var nomeLoc = loc.trim().toLowerCase();
		visualizzaIn.onclick=visualizza_c;
		nascondiIn.onclick=nascondi_c;
		nuovoIn.onclick=visualizza_form;
		userIn.onblur=blurUser;
		commentIn.onblur=blurComment;
		formIn.onsubmit=clickSubmit;
		annullaIn.onclick=delAll;
		extLink();		
	}
}

function init() {
  geo = require(['geolocation'], function (geolocation){});
  searchbar = document.getElementById('place');
  loc = document.getElementById('current_page');
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
	for(var i = 0; i < linksU.length; i++) {
		linksU[i].onclick = function(){
			popUp(this.getAttribute("href"));
			return false;
		}
	}
	for(var i = 0; i < linksU.length; i++) {
		linksG[i].onclick = function(){
			popUp(this.getAttribute("href"));
			return false;
		}
	}
}

function popUp(url) {
	window.open(url,'_blank');
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

	/*Script commenti degli utenti*/
	function visualizza_c(){
		if(f){
			document.getElementById('visualizza_commenti').setAttribute('class',"");
			xml=loadXMLDoc("cgi-bin/commenti.xml");
			xsl=loadXMLDoc("cgi-bin/commenti.xsl");
			if (window.ActiveXObject || // codice per IE
				xhttp.responseType == "msxml-document") {
					text = xml.transformNode(xsl);
					nomeLoc = getNome(nomeLoc);
					content=text.getElementById("nome_"+nomeLoc);
					if(content.innerHTML == "") {
						content = document.createElement("div");
						content.innerHTML = "Non ci sono commenti da visualizzare";
					}
					document.getElementById("visualizza_commenti").innerHTML = content;
				} // codice per Chrome, Firefox, Opera, etc.
				else if (document.implementation &&
					document.implementation.createDocument){
						xsltProcessor = new XSLTProcessor();
						xsltProcessor.importStylesheet(xsl);
						text= xsltProcessor.transformToFragment(xml, document);
						nomeLoc = loc.trim().toLowerCase();
						nomeLoc = getNome(nomeLoc);
						content=text.getElementById("nome_"+nomeLoc);
						if(content.innerHTML == "") {
							content = document.createElement("div");
							content.innerHTML = "Non ci sono commenti da visualizzare";
						}
						document.getElementById("visualizza_commenti").appendChild(content);
					}
				}
				f=false;
			}

			function getNome(loc) {
				var locNomi = {"londra":"london","madonna di campiglio":"madonnadicampiglio","zante":"zakynthos","praga":"praga","parigi":"paris"};
				return locNomi[loc];
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
				var vis_com=document.getElementById('visualizza_commenti');
				var com= document.getElementById("nome_"+nomeLoc);
				vis_com.removeChild(com);
				f=true;
			}

			function visualizza_form(){
				formIn.setAttribute('class', "");
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
			
