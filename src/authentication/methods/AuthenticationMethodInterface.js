'use strict';

const NodeRedConfig = require('../../utils/NodeRedConfig');

class AuthenticationMethodInterface {
    constructor (_nodeConfig = {}, _propertiesToExtract = []) {
        this.authConfig = {};

        _propertiesToExtract.forEach(_propertyToExtract => {
            this.authConfig[_propertyToExtract] = NodeRedConfig.extractPropertyFromConfig(_nodeConfig, _propertyToExtract);
        });
    }

    generateAxiosCompatibleConfig () {
        throw new Error('This method shoud be overriden -> generateAxiosCompatibleConfig');
    }
}

module.exports = AuthenticationMethodInterface;
