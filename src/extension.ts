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
      const url = `https://ithy.com/?query=${encodedQuery}`;

      // Create and show a new webview panel
      const panel = vscode.window.createWebviewPanel(
        'ithyWebview',
        `Ithy: ${query}`,
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
        }
      );

      // Set the webview's HTML content with an iframe
      panel.webview.html = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Ithy</title>
          <style>
            html, body, iframe { height: 100%; width: 100%; margin: 0; padding: 0; border: none; }
            body { overflow: hidden; }
            iframe { border: none; }
          </style>
        </head>
        <body>
          <iframe src="${url}" width="100%" height="100%" sandbox="allow-scripts allow-same-origin allow-forms allow-popups"></iframe>
        </body>
        </html>`;
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
