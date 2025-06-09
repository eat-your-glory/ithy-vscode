import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let promptIthy = vscode.commands.registerCommand('ithy-vscode.promptIthy', async () => {
    // Prompt user for search query
    const query = await vscode.window.showInputBox({
      placeHolder: 'Enter your Ithy prompt',
      prompt: 'Prompt Ithy in your default browser'
    });

    if (query) {
      // Encode the query for URL
      const encodedQuery = encodeURIComponent(query);

      // Create a URI and open it in the default browser
      const uri = vscode.Uri.parse(`https://ithy.com/?query=${encodedQuery}`);
      await vscode.env.openExternal(uri);
    }
  });

  let openBaseIthy = vscode.commands.registerCommand('ithy-vscode.openBaseIthy', async () => {
    // Open the base Ithy URL in the default browser
    const uri = vscode.Uri.parse('https://ithy.com/');
    await vscode.env.openExternal(uri);
  });

  context.subscriptions.push(promptIthy);
  context.subscriptions.push(openBaseIthy);
}

export function deactivate() {}
