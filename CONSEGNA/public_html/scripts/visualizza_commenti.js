window.onload = load;

var lc=document.getElementById('nav_selected').innerHTML;
var loc=lc.toLowerCase();

function load(){
  visualizza_c();
}

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
