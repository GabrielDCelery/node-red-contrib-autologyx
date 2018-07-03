'use strict';

const AuthenticationMethodInterface = require('./AuthenticationMethodInterface');
const PROPERTIES_TO_EXTRACT_FROM_NODE_RED_CONFIG = ['username', 'password'];

class HTTPBasicAuth extends AuthenticationMethodInterface {
    constructor(_nodeConfig) {
        super(_nodeConfig, PROPERTIES_TO_EXTRACT_FROM_NODE_RED_CONFIG);
    }

    generateAxiosCompatibleConfig(_axiosConfig) {
        return { auth: JSON.parse(JSON.stringify(this.authConfig)) };
    }
}

module.exports = HTTPBasicAuth;