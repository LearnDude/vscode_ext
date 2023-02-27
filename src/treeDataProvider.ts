import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export class ProcessOverviewTreeDataProvider
  implements vscode.TreeDataProvider<Dependency>
{
  constructor(private workspaceRoot: string, private processFilePath: string) {
    console.log(
      `ProcessOverviewTreeDataProvider: ${processFilePath}, root: ${workspaceRoot}`
    );
    this.processFilePath = processFilePath;
    this.workspaceRoot = workspaceRoot;
  }

  getTreeItem(element: Dependency): vscode.TreeItem {
    console.log(`getTreeItem: ${element}, label: ${element.label}`);
    const treeItem = new Dependency(
      element.label,
      "root",
      vscode.TreeItemCollapsibleState.None
    );
    return element;
  }

  getChildren(element?: Dependency): Thenable<Dependency[]> {
    console.log(`getChildren top: ${element ? element.label : "root"}`);

    if (!this.workspaceRoot) {
      vscode.window.showInformationMessage("No dependency in empty workspace");
      return Promise.resolve([]);
    }

    this.readProcessOutline(this.processFilePath);

    if (!element) {
      const rootDependency = new Dependency(
        this.processName,
        "root",
        vscode.TreeItemCollapsibleState.Expanded
      );
      return Promise.resolve([rootDependency]);
    } else {
      console.log(`getChildren: root: ${this.outline}`);
      var dependencies: Dependency[] = [];
      for (var i = 0; i < this.outline.length; i++) {
        const label = this.outline[i] as string;
        const dependency = new Dependency(
          label,
          label + ".txt",
          vscode.TreeItemCollapsibleState.None
        );
        dependencies.push(dependency);
      }
      return Promise.resolve(dependencies);
    }
  }

  outline = [] as Array<string>;
  dataFiles = {} as Map<string, string>;
  processName = "unknown";

  private readProcessOutline(fileName: string) {
    const path = this.workspaceRoot + "/" + fileName;
    console.log(`Reading process outline from: ${fileName}`);
    const processOutline = JSON.parse(fs.readFileSync(path, "utf-8"));
    if (!processOutline) {
      console.error(`Failed to load ${fileName}`);
      return;
    }

    this.outline = processOutline.outline;
    this.dataFiles = processOutline.dataFiles;
    this.processName = processOutline.name;
  }

  private _onDidChangeTreeData: vscode.EventEmitter<
    Dependency | undefined | null | void
  > = new vscode.EventEmitter<Dependency | undefined | null | void>();

  readonly onDidChangeTreeData: vscode.Event<
    Dependency | undefined | null | void
  > = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  private pathExists(p: string): boolean {
    try {
      fs.accessSync(p);
    } catch (err) {
      return false;
    }
    return true;
  }
}

export class Dependency extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public fileName: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.fileName}`;
    this.description = this.label;
  }

  deleteEntry(): void {
    console.log(`deleteEntry: ${this.label}`);
  }

  iconPath = {
    light: path.join(
      __filename,
      "..",
      "..",
      "resources",
      "light",
      "dependency.svg"
    ),
    dark: path.join(
      __filename,
      "..",
      "..",
      "resources",
      "dark",
      "dependency.svg"
    ),
  };
}
