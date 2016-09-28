$openSSLPath = "c:\OpenSSL-Win64\bin\openssl.exe"
$pfxPath = "c:\Certs\sp2013dev.apps.pfx"
$pfxPassword = "QazWsx123"

$encryptedKeyName = "spaddin_encrypted.key"
$keyName = "spaddin.key"

$args = @("pkcs12", "-in", $pfxPath, "-out", $encryptedKeyName, "-nocerts", "-nodes", "-passin", "pass:$($pfxPassword)")
$args2 = @("rsa", "-in", $encryptedKeyName, "-out", $keyName)

& $openSSLPath $args 
$result = & $openSSLPath $args2 2>&1 | Out-String

$certificate = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2($pfxPath, $pfxPassword)

$result = [System.Convert]::ToBase64String($certificate.GetCertHash()).Replace('+', '-').Replace('/', '_').Replace("=", "")

Write-Host $result