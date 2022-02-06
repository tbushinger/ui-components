const mockChrome = {
    runtime: {
        connect: () => {
            console.log("mock chrome runtime connect");
            return {
                onMessage: {
                    addListener: () => {
                        console.log("add mock listener");
                    }
                },
                postMessage: (...args: any) => {
                    console.log("post mock message", ...args)
                },
            }
        },
    },
    devtools: {
        inspectedWindow: {
            tabId: 0,
        },
    },
};

export default function getChrome(): any {
    return (chrome && chrome.runtime && chrome.devTools) ? chrome : mockChrome;
}