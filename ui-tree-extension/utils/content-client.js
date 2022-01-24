class ContentClientClass {
    constructor() {
        this.handlers = {};
        this.runtime = chrome.runtime;
        this.window = window;

        this.runtime.onMessage.addListener((msg, _sender, _sendResponse) => {
            const { name, content } = msg;
            const handler = (this && this.handlers) ? this.handlers[name] : null;
            if (!handler) {
                return;
            }

            handler(content);
        });

        this.window.addEventListener('message', (event) => {
            const { name, content } = event.data;
            console.assert(name, "missing name");
            console.assert(content, "missing content");

            contentClient.postMessage(name, content);
        });

        this.addListener(SYSTEM_MESSAGES.pingContent, () => {
            this.postMessage(SYSTEM_MESSAGES.pingResponse);
        })
    }

    postMessage(name, content = null) {
        this.runtime.sendMessage({
            content,
            name,
        });
    }

    postExternalMessage(name, content = null) {
        this.window.postMessage({
            content,
            name,
        });
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

let _contentClientInstance;
function createContentClient() {
    if (!_contentClientInstance) {
        _contentClientInstance = new ContentClientClass();
    }

    return _contentClientInstance;
}
