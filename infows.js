const { WorkSpacesClient, DescribeWorkspacesCommand } = require("@aws-sdk/client-workspaces");
const { fromIni } = require("@aws-sdk/credential-provider-ini");

const getWorkspacesInfo = async () => {
  const credentials = fromIni({ profile: "default" }); // Reemplaza "default" con el perfil deseado

  const workspacesClient = new WorkSpacesClient({
    region: "eu-central-1", // Reemplaza "us-west-2" con tu región AWS
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
    console.error("Error al obtener información de los WorkSpaces:", error);
    throw error;
  }
};

const run = async () => {
  try {
    const workspacesInfo = await getWorkspacesInfo();
    console.log("Información de los WorkSpaces:", workspacesInfo);
  } catch (error) {
    console.error("Error en la ejecución del script:", error);
  }
};

run();