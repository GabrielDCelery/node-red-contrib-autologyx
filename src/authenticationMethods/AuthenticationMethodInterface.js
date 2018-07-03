'use strict';

const _ = require('lodash');

class AuthenticationMethodInterface {
    constructor(_nodeConfig = {}, _propertiesToExtract = []) {
        _propertiesToExtract.forEach(_propertyToExtract => {
            if (!_nodeConfig.hasOwnProperty(_propertyToExtract)) {
                throw new Error(`Node-Red config missing configuration property -> ${_propertyToExtract}`);
            }
        });

        this.authConfig = _.pick(_nodeConfig, _propertiesToExtract);
    }

    generateAxiosCompatibleConfig() {
        throw new Error('This method shoud be overriden -> generateAxiosCompatibleConfig');
    }
}

module.exports = AuthenticationMethodInterface;