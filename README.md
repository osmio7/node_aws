# NodeJS AWS SDK

This project has test scripts with the AWS WORKSPACES SDK [AWS SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html).
Node Version: Node v18.16.1

Install dependencies
```
npm install @aws-sdk/client-workspaces @aws-sdk/credential-provider-ini
```
## Available Scripts

There are 2 scripts, infows.js and statews.js.

### `node infows.js`

It will show us the data of the AWS workspaces and their information.:
- workspaceId: workspace.WorkspaceId,
- privateIp: workspace.IpAddress,
- state: workspace.State,
- computername: workspace.ComputerName,
- bundleId: workspace.BundleId,
- directoryId: workspace.DirectoryId,     
- username: workspace.UserName,
- propertiesWs: workspace.WorkspaceProperties

### `node statews.js`

First, it shows us the workspaces we have with their ID and status. Then it will ask us:
- Enter the ID of the WorkSpaces instance you want to turn on or off:
- Enter the action you want to perform (start/stop):
