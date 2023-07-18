# NodeJS AWS SDK

Este proyecto tiene scripts de pruebas con el SDK de AWS WORKSPACES [AWS SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html).

Instalar las dependencias 
```
npm install @aws-sdk/client-workspaces @aws-sdk/credential-provider-ini
```
## Available Scripts

Se cuentan con 2 scripts infows.js y statews.js:

### `node infows.js`

Nos mostrara los datos de los workspaces dados de altas, nos regresara la siguiente información:
- workspaceId: workspace.WorkspaceId,
- privateIp: workspace.IpAddress,
- state: workspace.State,
- computername: workspace.ComputerName,
- bundleId: workspace.BundleId,
- directoryId: workspace.DirectoryId,     
- username: workspace.UserName,
- propertiesWs: workspace.WorkspaceProperties

### `node statews.js`

Primeramente nos muestra los workspace con los que contamos su ID y su Estado, despues nos pedira:
- Ingrese el ID de la instancia de WorkSpaces que desea encender o apagar:
- Ingrese la acción que desea realizar (start/stop):
