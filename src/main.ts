import { activate } from "./extension";
import * as vscode from "vscode";

function main() {
  //   const ctxt = vscode.extensions.getExtension("BE.ac-ui");
  //   const john = vscode.extensions.getExtensionContext("BE.ac-ui");
  vscode.extensions.getExtension("BE.ac-ui")?.activate();
  //   ctxt?.activate();
  //   if (ctxt) {
  //     console.log(ctxt);
  //     // activate(ctxt);
  //   } else {
  //     console.log("No extension context");
  //   }
}

main();
