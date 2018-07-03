'use strict';

const AUTHENTICATION_METHODS = {
    noauth: require('./authenticationMethods/NoAuth'),
    httpbasic: require('./authenticationMethods/HTTPBasicAuth')
}

class Authenticator {
    constructor() {
        this.authentication = null;
    }
    
    setAuthenticationMethod(_nodeConfig = {}) {
        const _authentication = _nodeConfig.authentication;

        if (!AUTHENTICATION_METHODS[_authentication]) {
            throw new Error(`Trying to instantiate a non-existent authentication class -> ${_authentication}`);
        }
        
        this.authentication = new AUTHENTICATION_METHODS[_authentication](_nodeConfig);

        return this;
    }

    generateAxiosCompatibleConfig () {
        return this.authentication.generateAxiosCompatibleConfig();
    }
}

module.exports = Authenticator;