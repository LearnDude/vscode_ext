import * as vscode from "vscode";
import * as fs from "fs";

export function populateOutline(fileName: string) {
  const processOutline = JSON.parse(fs.readFileSync(fileName, "utf-8"));
  if (!processOutline) {
    console.error(`Failed to load ${fileName}`);
    return;
  }
  const outline = processOutline.outline;

  // get handle to "ac-ui" view
  // const outlineView = vscode.window.createTreeView("ac-ui", {

  // populate outline view with outline

  // const outlineView = vscode.window.createTreeView("outlineView", {
}
