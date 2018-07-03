'use strict';

const AuthenticationMethodInterface = require('./AuthenticationMethodInterface');
const PROPERTIES_TO_EXTRACT_FROM_NODE_RED_CONFIG = [];

class NoAuth extends AuthenticationMethodInterface {
    constructor(_nodeConfig) {
        super(_nodeConfig, PROPERTIES_TO_EXTRACT_FROM_NODE_RED_CONFIG);
    }

    generateAxiosCompatibleConfig() {
        return {};
    }
}

module.exports = NoAuth;