<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:wix="http://schemas.microsoft.com/wix/2006/wi"
                xmlns:msxsl="urn:schemas-microsoft-com:xslt"
                exclude-result-prefixes="msxsl">

  <xsl:output method="xml" indent="yes"/>

  <!--Identity Transform-->
  <xsl:template match="@*|node()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>

  <!-- Set up keys for ignoring various file types -->
  <xsl:key name="config-exe" match="wix:Component[substring(wix:File/@Source, (string-length(wix:File/@Source) - string-length('Quantumart.FooApp.ArticleScheduler.WinService.exe')) + 1) = 'Quantumart.FooApp.ArticleScheduler.WinService.exe']" use="@Id"/>
  
  <xsl:template match="wix:Component[key('config-exe', @Id)]"/>
  <xsl:template match="wix:ComponentRef[key('config-exe', @Id)]"/>
</xsl:stylesheet>