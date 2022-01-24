chrome.devtools.panels.create("Remix Data","FontPicker.png","panel.html", () => null);

const client = createDevToolsClient();

client.loadContentFiles(["utils/common.js", "utils/content-client.js", "content.js"]);