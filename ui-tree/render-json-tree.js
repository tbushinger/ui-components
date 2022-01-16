function renderJsonTree(tree) {
    const root = {
        'root-model': tree,
    };

    function extractInfo(path) {
        const len = path.length;
        let name;
        const parentSegments = [];

        path.forEach((segment, idx) => {
            if (idx === len - 1) {
                name = segment;
            } else {
                parentSegments.push(segment);
            }
        });

        return {
            name,
            parentId: parentSegments.join('.'),
            id: path.join('.'),
        };
    }

    function isValidPath(path) {
        return path.length > 1;
    }

    const onNode = (node, path, _isArray) => {
        if (!isValidPath(path)) {
            return node;
        }

        const { parentId, id, name } = extractInfo(path);

        const text = `${name} (${_isArray ? 'Array' : 'Object'})`;

        uiTreeApi.createNode(parentId, id, text);

        return node;
    };

    const onLeaf = (value, path) => {
        if (!isValidPath(path)) {
            return value;
        }

        const { parentId, id, name } = extractInfo(path);

        uiTreeApi.createLeaf(parentId, id, name, value);

        return value;
    };

    traverseObject(root, onNode, onLeaf);
}
