class DevToolsClient {
    constructor() {
        this.handlers = {};    
        this.port = chrome.runtime.connect({ name: "devtools-page" });
        this.tabId = chrome.devtools.inspectedWindow.tabId;

        this.port.onMessage.addListener((msg) => {
            const { name, content } = msg;
            const handler = (this && this.handlers) ? this.handlers[name] : null;
            if (!handler) {
                return;
            }

            handler(content);
        });
    }

    postMessage(name, content = null) {
        this.port.postMessage({
            content,
            name,
            tabId: this.tabId,
        });
    }

    loadContentFiles(files) {
        this.postMessage(SYSTEM_MESSAGES.loadContentFiles, files);
    }

    addListener(name, handler) {
        this.handlers[name] = handler;

        return () => {
            delete this.handlers[name];
        };
    }

    dispose() {
        this.handlers = {};
    }
}

let _devToolsClientInstance;
function createDevToolsClient() {
    if (!_devToolsClientInstance) {
        _devToolsClientInstance = new DevToolsClient();
    }

    return _devToolsClientInstance;
}
