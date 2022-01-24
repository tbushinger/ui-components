class PanelClient {
    constructor() {
        this.handlers = {};
        this.port = chrome.runtime.connect({ name: "panel" });
        this.tabId = chrome.devtools.inspectedWindow.tabId;

        this.postMessage(SYSTEM_MESSAGES.bindTabPort);

        this.port.onMessage.addListener((msg) => {
            const { name, content } = msg;
            const handler = this.handlers[name];
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

    reloadContent() {
        this.postMessage(SYSTEM_MESSAGES.pingContent);
        let loaded = false;
        const unsub = this.addListener(SYSTEM_MESSAGES.pingResponse, () => {
            loaded = true;
        });

        setTimeout(() => {
            if (loaded) {
                return;
            }

            unsub();
            this.postMessage(SYSTEM_MESSAGES.reloadContent);
        }, 100);
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

let _panelClientInstance;
function createPanelClient() {
    if (!_panelClientInstance) {
        _panelClientInstance = new PanelClient();
    }

    return _panelClientInstance;
}
