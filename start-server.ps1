param (
    [int]$Port = 8080
)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
if (-not $ScriptDir) { $ScriptDir = Get-Location }

$HostIP = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Wi-Fi*", "Ethernet*" -ErrorAction SilentlyContinue | Where-Object { $_.IPAddress -notlike "169.254*" -and $_.IPAddress -notlike "127.*" } | Select-Object -First 1).IPAddress
if (-not $HostIP) { $HostIP = "localhost" }

$Listener = New-Object System.Net.HttpListener
$Prefix = "http://+:$Port/"

try {
    $Listener.Prefixes.Add($Prefix)
    $Listener.Start()
} catch {
    $Listener = New-Object System.Net.HttpListener
    $Prefix = "http://localhost:$Port/"
    $Listener.Prefixes.Add($Prefix)
    $Listener.Start()
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Network Specialist Exam Prep Web App Started!" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " [PC Browser]       : http://localhost:$Port/" -ForegroundColor Yellow
if ($HostIP -ne "localhost") {
    Write-Host " [Android Smartphone]: http://${HostIP}:$Port/" -ForegroundColor Yellow
}
Write-Host " Press Ctrl+C in this terminal to stop the server." -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan

Start-Process "http://localhost:$Port/"

$MimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

while ($Listener.IsListening) {
    try {
        $Context = $Listener.GetContext()
        $Request = $Context.Request
        $Response = $Context.Response

        $UrlPath = $Request.Url.LocalPath
        if ($UrlPath -eq "/" -or $UrlPath -eq "") { 
            $UrlPath = "/index.html" 
        }
        
        $RelPath = $UrlPath.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
        $FilePath = Join-Path $ScriptDir $RelPath

        if (Test-Path $FilePath -PathType Leaf) {
            $Ext = [System.IO.Path]::GetExtension($FilePath).ToLower()
            $ContentType = "application/octet-stream"
            if ($MimeTypes.ContainsKey($Ext)) { 
                $ContentType = $MimeTypes[$Ext] 
            }
            $Response.ContentType = $ContentType

            $Bytes = [System.IO.File]::ReadAllBytes($FilePath)
            $Response.ContentLength64 = $Bytes.Length
            $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
        } else {
            $Response.StatusCode = 404
            $NotFoundBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $Response.OutputStream.Write($NotFoundBytes, 0, $NotFoundBytes.Length)
        }
        $Response.OutputStream.Close()
    } catch {
        if (-not $Listener.IsListening) { break }
    }
}
