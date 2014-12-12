<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method='html' version='1.0' encoding='UTF-8'
    indent='yes'/>
  <xsl:template match="/">
    <xsl:for-each select="comments/comment">
      <xsl:sort select="num" data-type="number" />
      <h1><xsl:value-of="@user"></h1>
      <p><span class="pubdate"><xsl:value-of="pubblicationDate"></span></p>
      <p><xsl:value-of="corpo"></p>
    </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>
