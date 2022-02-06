
class JsonTreeRender {
    constructor(uiTreeApi) {
        this.uiTreeApi = uiTreeApi;
        this.onNode = this.onNode.bind(this);
        this.onLeaf = this.onLeaf.bind(this);
        this.ids = {};
        this.prevIds = {};
    }

    extractInfo(path) {
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

    isValidPath(path) {
        return path.length > 1;
    }

    updateIds(id) {
        this.ids[id] = true;
        if (this.prevIds[id]) {
            delete this.prevIds[id];
        }
    }

    removedUnusedNodes() {
        Object.keys(this.prevIds).forEach(this.uiTreeApi.removeNode);
    }

    storePrevIds() {
        this.prevIds = this.ids;
        this.ids = {};
    }

    onNode(node, path, _isArray) {
        if (!this.isValidPath(path)) {
            return node;
        }

        const { parentId, id, name } = this.extractInfo(path);

        const text = `${name} (${_isArray ? 'Array' : 'Object'})`;

        this.uiTreeApi.createNode(parentId, id, text);

        this.updateIds(id);

        return node;
    };

    onLeaf(value, path) {
        if (!this.isValidPath(path)) {
            return value;
        }
        
        const { parentId, id, name } = this.extractInfo(path);

        this.uiTreeApi.createLeaf(parentId, id, name, value);

        this.updateIds(id);

        return value;
    };

    render(tree) {
        traverseObject(tree, this.onNode, this.onLeaf);

        this.removedUnusedNodes();
        this.storePrevIds();
    }
}

function createRenderer(uiTreeApi) {
    return new JsonTreeRender(uiTreeApi);
}