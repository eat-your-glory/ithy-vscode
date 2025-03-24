import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('ithy-vscode.promptIthy', async () => {
    // Prompt user for search query
    const query = await vscode.window.showInputBox({
      placeHolder: 'Enter your Ithy prompt',
      prompt: 'Prompt Ithy in your default browser'
    });

    if (query) {
      // Encode the query for URL
      const encodedQuery = encodeURIComponent(query);

      // Create a URI and open it in the default browser
      const uri = vscode.Uri.parse(`https://www.google.com/search?q=${encodedQuery}`);
      await vscode.env.openExternal(uri);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
