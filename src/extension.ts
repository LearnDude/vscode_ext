// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import {
  ProcessOverviewTreeDataProvider,
  Dependency,
} from "./treeDataProvider";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "ac-ui" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.BE2.ac-ui",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from ac_ui!");
    }
  );

  context.subscriptions.push(disposable);

  const rootPath = "/mnt/9E28E54828E5204F/Code/vscode_ext/vscode_ext/";

  console.log(`rootPath: ${rootPath}`);
  console.log(
    `vscode.workspace.workspaceFolders: ${vscode.workspace.workspaceFolders}`
  );

  // const absolutePath =
  //   "/mnt/9E28E54828E5204F/Code/vscode_ext/vscode_ext/data/process_outline.json";

  const treeDataProvider = new ProcessOverviewTreeDataProvider(
    rootPath,
    "/data/process_outline.json"
  );

  let s = await vscode.window.registerTreeDataProvider(
    "ac-ui-process_tree",
    treeDataProvider
  );
  console.log(`Registering commands, ${s}`);

  vscode.commands.registerCommand("ac-ui-process_tree.refreshEntry", () =>
    treeDataProvider.refresh()
  );
  vscode.commands.registerCommand("ac-ui-process_tree", (node: Dependency) =>
    node.deleteEntry()
  );
  // vscode.commands.registerCommand('ac-ui-process_tree', (node: Dependency) => viewInVisualizer(node));

  console.log("Opening folder");
  let success = await vscode.commands.executeCommand(
    "vscode.open",
    rootPath + "/data/C92_init_all_act.txt"
  );
  console.log(success);

  if (!success) {
    console.log("Failed to open folder");
  } else {
    console.log("Opened folder");
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
