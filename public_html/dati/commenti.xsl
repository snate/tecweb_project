<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:c="http://www.commenti.com">
  <xsl:output method='html' version='1.0' encoding='UTF-8' indent='yes'
    doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
    doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN" />

  <xsl:template match="/" >
    <html xmlns="http://www.w3.org/1999/xhtml"  xml:lang="it" lang="it">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Visualizza commenti</title>
        <meta name="title" content="Commenti sulle localita" />
        <meta name="description" content="Commenti sulle località" />
        <meta name="keywords" content="commenti, What To Visit, località" />
        <meta name="language" content="italian it" />
        <meta name="author" content="Graziano Grespan, Carlo Munarini, Federica Speggiorin, Sebastiano Valle" />
      </head>
      <body>
        <xsl:for-each select="c:comments/c:localita">
			<div>
			<xsl:attribute name="id">
				nome_<xsl:value-of select="@nome" />
			</xsl:attribute>
			<xsl:for-each select="c:comment">
            <p>
              <xsl:value-of select="@user" />
              <xsl:text> - </xsl:text>
              <span class="pubdate">
                <xsl:value-of select="c:pubblicationDate" />
              </span>
            </p>
            <p>
              <xsl:value-of select="c:corpo" />
            </p>
          </xsl:for-each>
		  </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
