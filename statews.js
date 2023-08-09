const { WorkSpacesClient, DescribeWorkspacesCommand, StartWorkspacesCommand, StopWorkspacesCommand } = require("@aws-sdk/client-workspaces");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function searchWorkspaces() {
  const client = new WorkSpacesClient({ region: "eu-central-1" }); // Replace "eu-central-1" with your AWS region

  const params = {};

  try {
    const response = await client.send(new DescribeWorkspacesCommand(params));

    if (response.Workspaces.length > 0) {
      console.log("The following WorkSpaces instances were found:");

      response.Workspaces.forEach(workspace => {
        console.log(`ID: ${workspace.WorkspaceId}`);
        console.log(`State: ${workspace.State}`);
        console.log("-----");
      });

      rl.question("Enter the ID of the WorkSpaces instance you want to start or stop: ", async workspaceId => {
        const action = await chooseAction();

        if (action === "start") {
          startWorkspace(workspaceId);
        } else if (action === "stop") {
          stopWorkspace(workspaceId);
        } else {
          console.log("Invalid option. Exiting the program.");
        }

        rl.close();
      });
    } else {
      console.log("No WorkSpaces instances were found.");
      rl.close();
    }
  } catch (error) {
    console.error("Error while searching for WorkSpaces instances:", error);
    rl.close();
  }
}

async function startWorkspace(workspaceId) {
  const client = new WorkSpacesClient({ region: "eu-central-1" }); // Replace "eu-central-1" with your AWS region

  const params = {
    StartWorkspaceRequests: [
      {
        WorkspaceId: workspaceId
      }
    ]
  };

  try {
    await client.send(new StartWorkspacesCommand(params));
    console.log(`WorkSpaces instance with ID ${workspaceId} has been started.`);
  } catch (error) {
    console.error(`Error while starting WorkSpaces instance with ID ${workspaceId}:`, error);
  }
}

async function stopWorkspace(workspaceId) {
  const client = new WorkSpacesClient({ region: "eu-central-1" }); // Replace "eu-central-1" with your AWS region

  const params = {
    StopWorkspaceRequests: [
      {
        WorkspaceId: workspaceId
      }
    ]
  };

  try {
    await client.send(new StopWorkspacesCommand(params));
    console.log(`Request to stop WorkSpaces instance with ID ${workspaceId} has been sent.`);
  } catch (error) {
    console.error(`Error while requesting to stop WorkSpaces instance with ID ${workspaceId}:`, error);
  }
}

async function chooseAction() {
  return new Promise((resolve, reject) => {
    rl.question("Enter the action you want to perform (start/stop): ", action => {
      if (action === "start" || action === "stop") {
        resolve(action);
      } else {
        reject(new Error("Invalid option."));
      }
    });
  });
}

// Call the searchWorkspaces function to search for WorkSpaces instances
searchWorkspaces();
