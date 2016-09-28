# sp-node-apponly-poc
POC on implementing app only call from SharePoint app and nodejs

## Brief steps:
1. Configure an environment for apps for SharePoint - [https://technet.microsoft.com/en-us/library/fp161236.aspx](https://technet.microsoft.com/en-us/library/fp161236.aspx)
2. Create certificate to sign tokens - [https://msdn.microsoft.com/en-us/library/office/fp179901.aspx](https://msdn.microsoft.com/en-us/library/office/fp179901.aspx). Create self-signed with IIS (valid for 1 year) or use `makecert` to create with more validity period:
    ```bash
    makecert.exe -r -pe -n "CN=<common name, for example sp2013dev>" -m 120 -len 4096 -a sha256 -eku 1.3.6.1.5.5.7.3.1 -ss my -sr localMachine -sky exchange -sp "Microsoft RSA SChannel Cryptographic Provider" -sy 12
    ``` 
    Certifcate above will be valid for 10 years. 
3. Export private `.pfx` and public `.cer` parts of the certificate. Certificate generated with `makecert` avaliable under IIS server certificates.
4. Create new trusted root authority and trusted token issuer in SharePoint. Use `CreateTrust.ps1`, update parameters `$publicCertPath`, `$authorityName`, `$issuerId`, `$tokenIssuerName`.
5. Register new app inside SharePoint - `<site url>/_layouts/15/appregnew.aspx` and save ClientId value.
6. Apply permissions to the app - `<site url>/_layouts/15/appinv.aspx`. Lookup the app by id, and paste the following xml:
    ```xml
    <AppPermissionRequests AllowAppOnlyPolicy="true">
        <AppPermissionRequest Scope="http://sharepoint/content/sitecollection" Right="FullControl" />
    </AppPermissionRequests>
    ```
    Click on "Trust".
7. Download and install openssl - [https://slproweb.com/products/Win32OpenSSL.html](https://slproweb.com/products/Win32OpenSSL.html)
8. Create private key and sha thumbprint for node js using `CerateKeys.ps1`. Update params `$openSSLPath`, `$pfxPath`, `$pfxPassword`
9. File `spaddin.key` will be created, in console sha thumbprint will be displayed. Save thumbprint.
10. Update `index.js` with appropriate values: 
 - `siteUrl` - SharePoint site url
 - `clientid` - Client Id generated on step 5
 - `realm` - SharePoint farm id (`Get-SPFarm | Select Id`)
 - `issuerid` - issuer id from step 4
 - `x5t` - sha thumbprint from step 9
 - `keyFilePath` - path to `.key` file created on step 9
11. Run `node index.js` and see all list from the site.