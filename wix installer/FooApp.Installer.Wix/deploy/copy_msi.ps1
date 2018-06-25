param(
  [String] $dest = '\\storage\Developers_share\FooApp_Installer',
  [String] $config = 'Release',
  [String] $ver = "8.0.0.0"
)

$source =  Join-Path "FooApp.Installer.Wix\bin" $config | Join-Path -ChildPath "ru-RU"

$target =  Join-Path $dest $ver
Write-Output $source

Write-Output "Copying msi file to $target ..."
Copy-Item -Path $source -Filter "*.msi" -Destination $target -Recurse -Force
Write-Output "Done!"