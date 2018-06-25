param(
  [String] $source = '',
  [bool] $removeViews = $false,
  [bool] $removeCustom = $false
)

function Remove-If-Exists ([string] $dir, [string] $item)
{
    if (-not($item.StartsWith("..")))
    {
        $src = Join-Path $dir $item
        if (Test-Path $src -PathType Leaf)
        {
            Remove-Item $src -Force
        }
    }
}

function Clean-Project([string] $source)
{
   if ([string]::IsNullOrEmpty($source)) { throw [System.ArgumentException] "Parameter 'source' is empty"}
   if (-not(Test-Path $source -PathType Leaf)) { throw [System.ArgumentException] "File $source not exists"}
   
   $dir = Split-Path $source -Parent
   
   [xml]$proj = Get-Content $source
   $proj.Project.ItemGroup.Compile.Include | Foreach-Object -Process { Remove-If-Exists $dir $_ }
   $proj.Project.ItemGroup.None.Include | Foreach-Object -Process { Remove-If-Exists $dir $_ }
   $proj.Project.ItemGroup.EmbeddedResource.Include | Foreach-Object -Process { Remove-If-Exists $dir $_ }
}

if ([string]::IsNullOrEmpty($source)) { throw [System.ArgumentException] "Parameter 'source' is empty"}
if (-not(Test-Path $source)) { throw [System.ArgumentException] "Folder $source not exists"}

Get-ChildItem -Path $source -Include *.csproj -Recurse | Foreach-Object -Process { Clean-Project $_.FullName }
Get-ChildItem -Path $source -Include *.csproj -Recurse | Remove-Item -Force
Get-ChildItem -Path $source -Include obj -Recurse | Remove-Item -Force -Recurse

if ($removeViews)
{
    Get-ChildItem -Path $source -Include *.cshtml -Recurse | Remove-Item -Force
}

if ($removeCustom)
{
    Get-ChildItem -Path $source -Include *.t4 -Recurse | Remove-Item -Force
    Get-ChildItem -Path $source -Include *.tt -Recurse | Remove-Item -Force
    Get-ChildItem -Path $source -Include web.*.config -Recurse | Remove-Item -Force
    Get-ChildItem -Path $source -Include *.sql -Recurse | Remove-Item -Force
}

do 
{
   $dirs = Get-ChildItem $source -Directory -Recurse | Where-Object { (Get-ChildItem $_.FullName -Force).Count -eq 0 } | Select-Object -Expandproperty FullName
   $dirs | Foreach-Object { Remove-Item $_ -Force }
} 
while ($dirs.Count -gt 0)

