<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:l="http://www.localita.com">
<xsl:output method='html' version='1.0' encoding='UTF-8' indent='yes'
doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN" />

	<xsl:template match="/" >
	<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="it" lang="it">
	<head> 
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Londra - What To Visit </title>
		<meta name="title" content="Londra (Città) - What To Visit" />
		<meta name="author" content="Graziano Grespan, Carlo Munarini, Federica Speggiorin, Sebastiano Valle" />
		<meta name="description" content="Londra, capitale del Regno Unito
		e luogo di affascinante incontro di culture" />
		<meta name="keywords" content="Londra, London, What To Visit, Città, Viaggi" />
		<meta name="robots" content="index,follow" />
		<meta name='reply-to' content='teamtecweb@gmail.com' />
		<meta name='Classification' content='Tourism' />
		<link rel="shortcut icon" href="../images/logo-icon.png"/>
    <link rel="stylesheet" media="all" type="text/css" href="../css/layout.css" />
    <link rel="stylesheet" media="handheld, screen and (max-width:480px), only screen and (max-device-width:480px)" type="text/css" href="../css/mlayout.css" />
    <link href="http://fonts.googleapis.com/css?family=Open+Sans+Condensed:700,300" rel="stylesheet" type="text/css" />
	</head>
	<body>
		<div id="header">
		<h1>
			<a href="homepage.xhtml" title="Pagina principale">
			WHAT TO VISIT
			</a>
		</h1>
		<div class="login_button">Login</div>
		</div>
		<div id="breadcrumb" >
		<ul id="navmenu">
			<li>Ti trovi in:<a href="homepage.xhtml" title="Pagina principale">
			<span xml:lang="en">Home</span>
			</a>&gt;<a href="citta.xhtml" title="Pagina delle località cittadine">
			Città
			</a>&gt; Londra</li>
		</ul>
		<form method="get" action="/search">
			<fieldset  id="search">
			<label for="place">Cerca:</label>
			<input name="place" id="place" type="text" tabindex="1"/>
			</fieldset>
		</form>
		</div>
		<div id="nav">
		<a id="skip" href="#descr_loc" title="Salta la navigazione">Salta la navigazione</a>
		<ul>
			<li id="nav_home">
			<a href="homepage.xhtml" title="Pagina principale" tabindex="2">
				<span xml:lang="en">Home</span>
			</a>
			<ul>
				<li id="nav_mare">
				<a href="mare.xhtml" title="Pagina delle località marittime" tabindex="3">
					Mare
				</a>
				</li>
				<li id="nav_cit">
				<a href="citta.xhtml" title="Pagina delle località cittadine" tabindex="4">
					Città
				</a>
            </li>
            <li id="nav_mont">
              <a href="montagna.xhtml" title="Pagina delle località montane" tabindex="7">
                Montagna
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
		<div id="descr_loc">
			<xsl:for-each select="l:localita/l:place[1]/l:contenuto/l:descrizione/node()">
				<xsl:copy-of select="." />
			</xsl:for-each>
		</div>
		<div id="aside">
			<xsl:for-each select="l:localita/l:place[1]/l:link/node()">
				<xsl:copy-of select="." />
			</xsl:for-each>
			<xsl:for-each select="l:localita/l:place[1]/l:info/node()">
				<xsl:copy-of select="." />
			</xsl:for-each>
		</div>
		</body>
	</html>	
	</xsl:template>
</xsl:stylesheet>