function traverseObject(node, onNode = (n) => n, onLeaf = (v) => v) {
    function isArray(value) {
        return Array.isArray(value);
    }
    
    function isScalarValue(value) {
        if (value === undefined || value === null) {
            return true;
        } else if (isArray(value)) {
            return false;
        } else if (value instanceof Date) {
            return true;
        } else if (value instanceof Object) {
            return false;
        }
    
        return true;
    }

    function _traverseObject(node, path = []) {
        if (isScalarValue(node)) {
            return onLeaf(node, path)
        }

        const _isArray = isArray(node);
        const nextNode = onNode(node, path, _isArray);
        
        if (_isArray) {
            return nextNode.map((child, index) => _traverseObject(child, path.concat([index])));
        }

        const keys = Object.keys(nextNode);
        return keys.reduce((acc, key) => {
            const child = nextNode[key];
            acc[key] = _traverseObject(child, path.concat([key]));

            return acc;
        }, {});
    }

    return _traverseObject(node);
}