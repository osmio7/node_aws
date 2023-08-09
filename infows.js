const { WorkSpacesClient, DescribeWorkspacesCommand } = require("@aws-sdk/client-workspaces");
const { fromIni } = require("@aws-sdk/credential-provider-ini");

const getWorkspacesInfo = async () => {
  const credentials = fromIni({ profile: "default" }); // Replace "default" with the desired profile

  const workspacesClient = new WorkSpacesClient({
    region: "eu-central-1", // Replace "eu-central-1" with your AWS region
    credentials
  });

  const describeWorkspacesCommand = new DescribeWorkspacesCommand({});

  try {
    const workspacesData = await workspacesClient.send(describeWorkspacesCommand);

    const workspacesInfo = workspacesData.Workspaces.map(workspace => ({
      workspaceId: workspace.WorkspaceId,
      privateIp: workspace.IpAddress,
      state: workspace.State,
      computername: workspace.ComputerName,
      bundleId: workspace.BundleId,
      directoryId: workspace.DirectoryId,     
      username: workspace.UserName,
      propertiesWs: workspace.WorkspaceProperties
    }));

    return workspacesInfo;
  } catch (error) {
    console.error("Error retrieving WorkSpaces information:", error);
    throw error;
  }
};

const run = async () => {
  try {
    const workspacesInfo = await getWorkspacesInfo();
    console.log("WorkSpaces Information:", workspacesInfo);
  } catch (error) {
    console.error("Error running the script:", error);
  }
};

run();
