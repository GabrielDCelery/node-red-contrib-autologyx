'use strict';

const _ = require('lodash');
const axios = require('axios');

const Authenticator = require('./Authenticator');
const ApiGroupConnector = require('./ApiGroupConnector');

class AutologyxApiNodeWrapper {
    constructor (_nodeConfig) {
        this.authenticator = new Authenticator();
        this.apiGroupConnector = new ApiGroupConnector();
    }

    setConfig (_nodeConfig) {
        this.authenticator.setAuthenticationMethod(_nodeConfig);
        this.apiGroupConnector.setApiGroupAndAction(_nodeConfig);

        return this;
    }

    sendRequest (_nodePayload = {}) {
        return axios(_.merge(
            this.authenticator.generateAxiosCompatibleConfig(),
            this.apiGroupConnector.generateAxiosCompatibleConfig(_nodePayload)
        ));
    }
}

module.exports = AutologyxApiNodeWrapper;