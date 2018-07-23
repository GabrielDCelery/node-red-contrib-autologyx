'use strict';

const NodeRedNodeConfig = require('../../utils/NodeRedNodeConfig');

class AuthenticationMethodInterface {
    constructor (_nodeConfig = {}, _propertiesToExtract = []) {
        this.authConfig = {};

        _propertiesToExtract.forEach(_propertyToExtract => {
            this.authConfig[_propertyToExtract] = NodeRedNodeConfig.extractValue(_nodeConfig, _propertyToExtract);
        });
    }

    generateAxiosCompatibleConfig () {
        throw new Error('This method shoud be overriden -> generateAxiosCompatibleConfig');
    }
}

module.exports = AuthenticationMethodInterface;
