const _routes = {
    [SYSTEM_MESSAGES.loadContentFiles]: (hub, message) => {
        const tabId =  message.tabId;
        const scriptInfo = {
            target: { tabId },
            files: message.content,
        };

        hub.contentFiles[tabId] = scriptInfo;

        chrome.scripting.executeScript(scriptInfo);
    },
    [SYSTEM_MESSAGES.reloadContent]: (hub, message) => {
        const tabId =  message.tabId;
        const content = hub.contentFiles[tabId];
        if (content) {
            chrome.scripting.executeScript(content);
        }
    },
    [SYSTEM_MESSAGES.bindTabPort]: (hub, message) => {
        hub.ports[message.tabId] = hub.port;
    },
    defaultPassThrough: (_hub, message) => {
        chrome.tabs.sendMessage(message.tabId, message, () => null);
    },
};

function _router(hub, message) {
    const name = (message && message.name) ? message.name : "defaultPassThrough";
    const route = _routes[name] || _routes.defaultPassThrough;
    route(hub, message);
}

class BackgroundHub {
    constructor() {
        this.ports = {};
        this.port = null;
        this.contentFiles = {};

        // Handles messages from the backend: (devtools, panels)
        chrome.runtime.onConnect.addListener((port) => {
            this.port = port;

            const portListener = (message, _sender, _sendResponse) => {
                _router(this, message);
            };

            this.port.onMessage.addListener(portListener);
      
            this.port.onDisconnect.addListener(() => {
                this.port.onMessage.removeListener(portListener);

                const tabs = Object.keys(this.ports);
                tabs.forEach((tab) => {
                    if (this.ports[tab] === this.port) {
                        delete this.ports[tab];
                    }
                });        
            });
        });

        // Handles messages from the frontend: (content scripts)
        chrome.runtime.onMessage.addListener((request, sender, _sendResponse) => {
            if (sender.tab) {
                const tabId = sender.tab.id;
                if (tabId in this.ports) {
                    this.ports[tabId].postMessage(request);
                } else {
                    console.log("Tab not found in connection list.");
                }
            } else {
                console.log("sender.tab not defined.");
            }

            return true;
        });
    }

    addRoute(name, handler) {
        _routes[name] = handler;

        return () => {
            delete _routes[name];
        };
    }
}