param(
  [String] $name='FooApp',
  [String] $sqlPath='',
  [String] $configPath='',
  [String[]] $allowedServers,
  [Bool] $throwExceptions=$false,
  [int] $timeout=0
)

for ($i=0; $i -lt $allowedServers.length; $i++) {
	$allowedServers[$i] = $allowedServers[$i].ToLowerInvariant();
}

Import-Module SqlPS

if ([string]::IsNullOrEmpty($name)) { throw [System.ArgumentException] "Parameter 'name' is empty"}
if ([string]::IsNullOrEmpty($sqlPath)) { throw [System.ArgumentException] "Parameter 'sqlPath' is empty"}
if (-not(Test-Path $sqlPath)) { throw [System.ArgumentException] "File $sqlPath not exists"}

if (!$configPath)
{
    $registryPath = "hklm:\Software\Quantum Art\Q-Publishing"
    if (-not(Test-Path($registryPath))) { $registryPath = "hklm:\Software\Wow6432Node\Quantum Art\Q-Publishing" }
    if (-not(Test-Path($registryPath))) { throw "FooApp is not found in registry"}
    $configPath = & { (Get-ItemProperty -LiteralPath $registryPath -Name $args ).$args } 'Configuration file'
}

[xml]$XmlDocument = Get-Content -Path $configPath
ForEach ($customer in $XmlDocument.configuration.customers.customer)
{
    $sb = New-Object System.Data.Common.DbConnectionStringBuilder
    $sb.set_ConnectionString($customer.db)
    $db = $sb["Initial Catalog"]
	if ([string]::IsNullOrEmpty($db)) { $db = $sb["Database"] }

	$server = $sb["Data Source"]
	if ([string]::IsNullOrEmpty($server)) { $server = $sb["Server"] }

	$proceed = ($allowedServers.Count -eq 0) -or ($allowedServers.Contains($server.ToLowerInvariant()));

    if ($proceed)
    {
        try
        {
            Write-Output "Updating database $db..."
            if ([string]::IsNullOrEmpty($sb["User Id"]) -or [string]::IsNullOrEmpty($sb["Password"]))
            {
                Invoke-Sqlcmd -InputFile $sqlPath -ServerInstance $server -Database $db -querytimeout $timeout -Verbose -AbortOnError 2> $null
            }
            else
            {
                Invoke-Sqlcmd -InputFile $sqlPath -Username $sb["User Id"] -Password $sb["Password"] -ServerInstance $server -Database $db -querytimeout $timeout -Verbose -AbortOnError 2> $null
            }
            Write-Output "Done"
        }
        catch
        {
            $errmsg = "Error while updating database $db`: $_"
            if ($throwExceptions)
            {
              throw $errmsg
            }
            else
            {
              Write-Output $errmsg
            }
        }
    }
}
