<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:c="http://www.commenti.com">
  <xsl:output method='html' version='1.0' encoding='UTF-8' indent='yes'
    doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
    doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN" />

  <xsl:template match="/" >
    <html xmlns="http://www.w3.org/1999/xhtml"  xml:lang="it" lang="it">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Visualizzo commenti</title>
        <meta name="title" content="Commenti su localita" />
        <meta name="description" content="Prova per XSLT" />
        <meta name="keywords" content="commenti" />
        <meta name="language" content="italian it" />
        <meta name="author" content="Nate" />
      </head>
      <body>
        <p>Hello</p>
        <xsl:for-each select="c:comments/c:localita">
          <h1>
            <xsl:value-of select="@nome" />
          </h1>
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
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
