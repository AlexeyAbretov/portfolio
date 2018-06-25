param(
  [String] $source = 'build\source'
)

if ([string]::IsNullOrEmpty($source)) { throw [System.ArgumentException] "Parameter 'source' is empty"}
if (-not(Test-Path $source)) { throw [System.ArgumentException] "Folder $source not exists"}

$backendSource = Join-Path $source "backend"
$winLogonSource = Join-Path $source "Winlogon"
$schedulerSource = Join-Path $source "ArticleScheduler"
$commonSchedulerSource = Join-Path $source "CommonScheduler"
$siteMapSource = Join-Path $source "SiteMap"
$demoSiteSource = Join-Path $source "DemoSite"

if (-not(Test-Path $backendSource)) { throw [System.ArgumentException] "Folder $backendSource not exists"}
if (-not(Test-Path $winLogonSource)) { throw [System.ArgumentException] "Folder $winLogonSource not exists"}
if (-not(Test-Path $schedulerSource)) { throw [System.ArgumentException] "Folder $schedulerSource not exists"}
if (-not(Test-Path $commonSchedulerSource)) { throw [System.ArgumentException] "Folder $commonSchedulerSource not exists"}
if (-not(Test-Path $siteMapSource)) { throw [System.ArgumentException] "Folder $siteMapSource not exists"}
if (-not(Test-Path $demoSiteSource)) { throw [System.ArgumentException] "Folder $demoSiteSource not exists"}

Write-Output "Removing sources for $backendSource"
Invoke-Expression ".\FooApp.Installer.Wix\deploy\CleanSource.ps1 -source '$backendSource' -removeViews `$true"
Write-Output "Done"

Write-Output "Removing sources for $winLogonSource"
Invoke-Expression ".\FooApp.Installer.Wix\deploy\CleanSource.ps1 -source '$winLogonSource' -removeViews `$true"
Write-Output "Done"

Write-Output "Removing sources for $schedulerSource"
Invoke-Expression ".\FooApp.Installer.Wix\deploy\CleanSource.ps1 -source '$schedulerSource'"
Write-Output "Done"

Write-Output "Removing sources for $commonSchedulerSource"
Invoke-Expression ".\FooApp.Installer.Wix\deploy\CleanSource.ps1 -source '$commonSchedulerSource'"
Write-Output "Done"

Write-Output "Removing sources for $siteMapSource"
Invoke-Expression ".\FooApp.Installer.Wix\deploy\CleanSource.ps1 -source '$siteMapSource' -removeViews `$false -removeCustom `$true"
Write-Output "Done"

Write-Output "Removing sources for $demoSiteSource"
Invoke-Expression ".\FooApp.Installer.Wix\deploy\CleanSource.ps1 -source '$demoSiteSource' -removeViews `$false -removeCustom `$true"
Write-Output "Done"