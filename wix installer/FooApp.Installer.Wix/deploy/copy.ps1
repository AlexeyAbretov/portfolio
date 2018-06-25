param(
  [String] $source = 'FooApp',
  [String] $config = 'Release'
)

if ([string]::IsNullOrEmpty($source)) { throw [System.ArgumentException] "Parameter 'source' is empty"}
if (-not(Test-Path $source)) { throw [System.ArgumentException] "Folder $source not exists"}

$backendSource = Join-Path $source "siteMvc"
$winLogonSource = Join-Path $source "WinLogonMvc"
$schedulerSource = Join-Path $source "QuantumArt.Schedulers\Quantumart.FooApp.ArticleScheduler.WinService" | Join-Path -ChildPath "bin" | Join-Path -ChildPath $config
$commonSchedulerSource = Join-Path $source "QuantumArt.Schedulers\Quantumart.FooApp.Scheduler.Service" | Join-Path -ChildPath "bin" | Join-Path -ChildPath $config
$pluginsSource = Join-Path $source "plugins"
$sitesSource = Join-Path $source "sites"
$qaSource = Join-Path $source "qa"
$updateDbSource = Join-Path $source "dal" | Join-Path -ChildPath "scripts"
$executeSqlSource = "FooApp.Installer.Wix\deploy\executeSql.ps1"

$sqlUpdateFile = "current.sql"
$updateDbSource = $updateDbSource + "\$sqlUpdateFile"

$siteMapSource = Join-Path "QA.Engine.Administration" "QA.Engine.Administration.WebApp"

$targetSource = "build\source"
New-Item $targetSource -type directory

if (-not(Test-Path $backendSource)) { throw [System.ArgumentException] "Folder $backendSource not exists"}
if (-not(Test-Path $winLogonSource)) { throw [System.ArgumentException] "Folder $winLogonSource not exists"}
if (-not(Test-Path $targetSource)) { throw [System.ArgumentException] "Folder $targetSource not exists"}
if (-not(Test-Path $schedulerSource)) { throw [System.ArgumentException] "Folder $schedulerSource not exists"}
if (-not(Test-Path $commonSchedulerSource)) { throw [System.ArgumentException] "Folder $commonSchedulerSource not exists"}
if (-not(Test-Path $pluginsSource)) { throw [System.ArgumentException] "Folder $pluginsSource not exists"}
if (-not(Test-Path $sitesSource)) { throw [System.ArgumentException] "Folder $sitesSource not exists"}
if (-not(Test-Path $qaSource)) { throw [System.ArgumentException] "Folder $qaSource not exists"}
if (-not(Test-Path $siteMapSource)) { throw [System.ArgumentException] "Folder $siteMapSource not exists"}
if (-not(Test-Path $updateDbSource)) { throw [System.ArgumentException] "Folder $updateDbSource not exists"}
if (-not(Test-Path $executeSqlSource)) { throw [System.ArgumentException] "Folder $executeSqlSource not exists"}

Write-Output "Copying backend files ..."
$backendTarget = Join-Path $targetSource "Backend"
Copy-Item $backendSource $backendTarget -recurse
Write-Output "Done!"

Write-Output "Copying winlogon files ..."
$winlogonTarget = Join-Path $targetSource "Winlogon"
Copy-Item $winLogonSource $winlogonTarget -recurse
Write-Output "Done!"

Write-Output "Copying article scheduler files ..."
$schedulerTarget = Join-Path $targetSource "ArticleScheduler"
Copy-Item $schedulerSource $schedulerTarget -recurse
Write-Output "Done!"

Write-Output "Copying common scheduler files ..."
$commonSchedulerTarget = Join-Path $targetSource "CommonScheduler"
Copy-Item $commonSchedulerSource $commonSchedulerTarget -recurse
Write-Output "Done!"

Write-Output "Copying plugins files ..."
$pluginsTarget = Join-Path $targetSource "plugins"
Copy-Item $pluginsSource $pluginsTarget -recurse
Write-Output "Done!"

Write-Output "Copying sites files ..."
$sitesTarget = Join-Path $targetSource "sites"
Copy-Item $sitesSource $sitesTarget -recurse
Write-Output "Done!"

Write-Output "Copying qa files ..."
$qaTarget = Join-Path $targetSource "qa"
Copy-Item $qaSource $qaTarget -recurse
Write-Output "Done!"

Write-Output "Copying admin files ..."
$siteMapTarget = Join-Path $targetSource "SiteMap"
Copy-Item $siteMapSource $siteMapTarget -recurse
Write-Output "Done!"

Write-Output "Copying update db files ..."
$updateDbTarget = Join-Path $targetSource "db"
Copy-Item $updateDbSource -Destination (New-Item $updateDbTarget -Type container -force) -Container -force
Copy-Item $executeSqlSource -Destination (New-Item $updateDbTarget -Type container -force) -Container -force
Write-Output "Done!"