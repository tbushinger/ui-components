try {
    console.log("loading hub server...");
    importScripts("utils/common.js", "utils/background-hub.js");

    const hub = new BackgroundHub();
    if (hub) {
        console.log("Background Hub Ready!");
    }

    // Add other devtool/panel routes here
    // hub.addRoute("myRoute", () => null);

} catch (e) {
    console.log(e);
}



