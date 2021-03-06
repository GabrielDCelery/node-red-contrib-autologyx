'use strict';

const _ = require('lodash');

class NodeRedNodeConfig {
    static extractValue (_nodeConfig, _propertyName) {
        const _extracted = _.get(_nodeConfig, _propertyName, null);

        if (!_extracted) {
            throw new Error(`Node-Red node config missing configuration property -> ${_propertyName}`);
        }

        return _extracted;
    }
}

module.exports = NodeRedNodeConfig;
