param(
  [String] $ver = '8.0.0.0'
)

$variable = Get-Random

[xml]$xml = Get-Content FooApp.Installer.Wix\ProductProperties.wxi

foreach ($node in $xml.Include.ChildNodes)
{
    if ($node.Value.StartsWith('Version','CurrentCultureIgnoreCase'))
    {
	    $node.Value = 'Version = "' + $ver + '"'
    }
}

$xml.Save('FooApp.Installer.Wix\\ProductProperties.wxi')