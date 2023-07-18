const { WorkSpacesClient, DescribeWorkspacesCommand, StartWorkspacesCommand, StopWorkspacesCommand } = require("@aws-sdk/client-workspaces");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function searchWorkspaces() {
  const client = new WorkSpacesClient({ region: "eu-central-1" }); // Reemplaza "us-west-2" con tu región de AWS

  const params = {};

  try {
    const response = await client.send(new DescribeWorkspacesCommand(params));

    if (response.Workspaces.length > 0) {
      console.log("Las siguientes instancias de WorkSpaces se encontraron:");

      response.Workspaces.forEach(workspace => {
        console.log(`ID: ${workspace.WorkspaceId}`);
        console.log(`Estado: ${workspace.State}`);
        console.log("-----");
      });

      rl.question("Ingrese el ID de la instancia de WorkSpaces que desea encender o apagar: ", async workspaceId => {
        const action = await chooseAction();

        if (action === "start") {
          startWorkspace(workspaceId);
        } else if (action === "stop") {
          stopWorkspace(workspaceId);
        } else {
          console.log("Opción inválida. Saliendo del programa.");
        }

        rl.close();
      });
    } else {
      console.log("No se encontraron instancias de WorkSpaces.");
      rl.close();
    }
  } catch (error) {
    console.error("Error al buscar las instancias de WorkSpaces:", error);
    rl.close();
  }
}

async function startWorkspace(workspaceId) {
  const client = new WorkSpacesClient({ region: "eu-central-1" }); // Reemplaza "us-west-2" con tu región de AWS

  const params = {
    StartWorkspaceRequests: [
      {
        WorkspaceId: workspaceId
      }
    ]
  };

  try {
    await client.send(new StartWorkspacesCommand(params));
    console.log(`Se ha iniciado la instancia de WorkSpaces con ID ${workspaceId}.`);
  } catch (error) {
    console.error(`Error al iniciar la instancia de WorkSpaces con ID ${workspaceId}:`, error);
  }
}

async function stopWorkspace(workspaceId) {
  const client = new WorkSpacesClient({ region: "eu-central-1" }); // Reemplaza "us-west-2" con tu región de AWS

  const params = {
    StopWorkspaceRequests: [
      {
        WorkspaceId: workspaceId
      }
    ]
  };

  try {
    await client.send(new StopWorkspacesCommand(params));
    console.log(`Se ha solicitado detener la instancia de WorkSpaces con ID ${workspaceId}.`);
  } catch (error) {
    console.error(`Error al solicitar detener la instancia de WorkSpaces con ID ${workspaceId}:`, error);
  }
}

async function chooseAction() {
  return new Promise((resolve, reject) => {
    rl.question("Ingrese la acción que desea realizar (start/stop): ", action => {
      if (action === "start" || action === "stop") {
        resolve(action);
      } else {
        reject(new Error("Opción inválida."));
      }
    });
  });
}

// Llama a la función searchWorkspaces para buscar las instancias de WorkSpaces
searchWorkspaces();