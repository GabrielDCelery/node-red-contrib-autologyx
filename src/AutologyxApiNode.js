'use strict';

const _ = require('lodash');
const axios = require('axios');

const Authenticator = require('./Authenticator');
const ApiGroupConnector = require('./ApiGroupConnector');

class AutologyxApiNodeWrapper {
    constructor () {
        this.authenticator = new Authenticator();
        this.apiGroupConnector = new ApiGroupConnector();
    }

    setConfig (_nodeConfig) {
        this.authenticator.setConfig(_nodeConfig);
        this.apiGroupConnector.setConfig(_nodeConfig);

        return this;
    }

    sendRequest (_nodePayload = {}) {
        return axios(
            _.merge(
                this.authenticator.generateAxiosCompatibleConfig(),
                this.apiGroupConnector.generateAxiosCompatibleConfig(_nodePayload)
            )
        );
    }
}

module.exports = AutologyxApiNodeWrapper;
