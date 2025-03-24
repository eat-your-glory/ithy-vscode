import * as vscode from 'vscode';
import * as open from 'open';

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
      // Open the default browser with the search query
      await open(`https://www.google.com/search?q=${encodedQuery}`);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
