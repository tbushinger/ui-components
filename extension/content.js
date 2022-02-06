const contentClient = createContentClient();

contentClient.addListener('request-model', (_content) => {
    let model = {
        root: {
            cars: {
                car3: {
                    make: 'Ford',
                    model: 'F-150',
                },
                car4: {
                    make: 'Ford',
                    model: 'Mustang',
                    drivers: ['Bill', { name: 'Tom' }],
                },
            },
        },
    };

    const aceText = document.getElementsByClassName("ace_text-layer").item(0);
    if (aceText) {
        model = {
            root: JSON.parse(aceText.innerText),
        }
    }

    contentClient.postMessage('response-model', model);
});
