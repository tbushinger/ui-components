export function createNode(parentId, id, text) {
    const parent = document.getElementById(parentId);
    if (!parent) {
        return null;
    }

    let node = document.getElementById(id);
    let textElement;

    if (node) {
        textElement = node.querySelector('span');

        if (textElement.innerText !== text) {
            textElement.innerText = text;
        }

        return node;
    }

    node = document.createElement('ui-tree-node');

    node.id = id;
    node.slot = 'node';

    textElement = document.createElement('span');

    textElement.innerText = text;
    textElement.slot = 'text';

    node.appendChild(textElement);
    parent.appendChild(node);

    return node;
}

export function createLeaf(parentId, id, name, value) {
    const parent = document.getElementById(parentId);
    if (!parent) {
        return null;
    }

    let leaf = document.getElementById(id);
    let textElement;
    let nameElement;
    let valueElement;

    if (leaf) {
        nameElement = leaf.querySelector('.leaf-name');
        valueElement = leaf.querySelector('.leaf-value');

        if (nameElement.innerText !== name) {
            nameElement.innerText = name;
        }

        if (valueElement.innerText !== value) {
            valueElement.innerText = value;
        }

        return leaf;
    }

    leaf = document.createElement('ui-tree-leaf');

    leaf.id = id;
    leaf.slot = 'node';

    textElement = document.createElement('div');
    textElement.slot = 'text';
    textElement.className = 'leaf-text';

    nameElement = document.createElement('span');
    nameElement.className = 'leaf-name';
    nameElement.innerText = name;

    valueElement = document.createElement('span');
    valueElement.className = 'leaf-value';
    valueElement.innerText = value;

    textElement.appendChild(nameElement);
    textElement.appendChild(valueElement);

    leaf.appendChild(textElement);
    parent.appendChild(leaf);

    return leaf;
}

export function removeNode(id) {
    const node = document.getElementById(id);
    if (!node) {
        return;
    }

    if (!(node.tagName === 'UI-TREE-NODE' || node.tagName === 'UI-TREE-LEAF')) {
        return;
    }

    const parent = node.parentElement;
    parent.removeChild(node);
}
