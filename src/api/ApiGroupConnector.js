'use strict';

const NodeRedNodeConfig = require('../utils/NodeRedNodeConfig');

const API_GROUPS = {
    targets: require('./groups/Targets')
};

class ApiGroupConnector {
    constructor () {
        this.apiGroup = null;
    }

    setConfig (_nodeConfig = {}) {
        const _apiGroup = NodeRedNodeConfig.extractValue(_nodeConfig, 'apiGroup');

        if (!API_GROUPS[_apiGroup]) {
            throw new Error(`Trying to instantiate a non-existent api group -> ${_apiGroup}`);
        }

        this.apiGroup = new API_GROUPS[_apiGroup](_nodeConfig);

        return this;
    }

    generateAxiosCompatibleConfig (_nodePayload) {
        return this.apiGroup.generateAxiosCompatibleConfig(_nodePayload);
    }
}

module.exports = ApiGroupConnector;
