'use strict';

const NodeRedNodeConfig = require('../utils/NodeRedNodeConfig');

const AUTHENTICATION_METHODS = {
    noauth: require('./methods/NoAuth'),
    httpbasic: require('./methods/HTTPBasicAuth')
};

class Authenticator {
    constructor () {
        this.authMethod = null;
    }

    setConfig (_nodeConfig = {}) {
        const _authentication = NodeRedNodeConfig.extractValue(_nodeConfig, 'authentication');

        if (!AUTHENTICATION_METHODS[_authentication]) {
            throw new Error(`Trying to instantiate a non-existent authentication class -> ${_authentication}`);
        }

        this.authMethod = new AUTHENTICATION_METHODS[_authentication](_nodeConfig);

        return this;
    }

    generateAxiosCompatibleConfig () {
        return this.authMethod.generateAxiosCompatibleConfig();
    }
}

module.exports = Authenticator;
