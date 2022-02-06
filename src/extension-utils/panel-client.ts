import getChrome from './chrome-factory';
import { SYSTEM_MESSAGES } from './common';

export type Handler = (content: any) => void;
export type Unsub = () => void;

type Handlers = {
    [name: string]: Handler;
};

export class PanelClient {
    private static instance: PanelClient;
    private _chrome: any;
    private handlers: Handlers = {};
    private port: any;
    private tabId: number;

    constructor() {
        this._chrome = getChrome();
        this.handlers = {};
        this.port = this._chrome.runtime.connect({ name: 'panel' });
        this.tabId = this._chrome.devtools.inspectedWindow.tabId;

        this.postMessage(SYSTEM_MESSAGES.bindTabPort);

        this.port.onMessage.addListener((msg: any) => {
            const { name, content } = msg;
            const handler = this.handlers[name];
            if (!handler) {
                return;
            }

            handler(content);
        });
    }

    public postMessage(name: string, content: any = null): void {
        this.port.postMessage({
            content,
            name,
            tabId: this.tabId,
        });
    }

    public reloadContent(): void {
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

    public addListener(name: string, handler: Handler): Unsub {
        this.handlers[name] = handler;

        return () => {
            delete this.handlers[name];
        };
    }

    dispose() {
        this.handlers = {};
    }

    public static getInstance(): PanelClient {
        if (!PanelClient.instance) {
            PanelClient.instance = new PanelClient();
        }

        return PanelClient.instance;
    }
}

export default function createPanelClient(): PanelClient {
    return PanelClient.getInstance();
}
