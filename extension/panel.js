const client = createPanelClient();
const treeRenderer = createRenderer(uiTreeApi);

const btnRequestModel = document.getElementById('requestModel');
const btnReload = document.getElementById('reload');

btnRequestModel.addEventListener('click', () => {
    client.postMessage('request-model');
});

btnReload.addEventListener('click', () => {
    client.reloadContent();
});

function renderModel(model) {
    treeRenderer.render(model);
}

client.addListener('response-model', renderModel);