'use strict';

const _ = require('lodash');
const config = require('config');
const UrlGenerator = require('../../utils/UrlGenerator');
const NodeRedConfig = require('../../utils/NodeRedConfig');

const METHOD_GET = 'get';
const METHOD_POST = 'post';

class ApiGroupInterface {
    constructor (_nodeConfig) {
        this.METHOD_GET = METHOD_GET;
        this.METHOD_POST = METHOD_POST;
        this.API_BASE_PATHNAME = config.get('API_V1_BASE_PATHNAME');
        this.BASE_QUERY_OBJECT = {
            connector: NodeRedConfig.extractPropertyFromConfig(_nodeConfig, 'connector'),
            apiKey: NodeRedConfig.extractPropertyFromConfig(_nodeConfig, 'apiKey')
        };
        this.urlGenerator = new UrlGenerator()
            .setProtocol(config.get('DEFAULT_PROTOCOL'))
            .setPort(config.get('DEFAULT_PORT'))
            .setHostName(_nodeConfig.hostname);
        this._setAxiosCompatibleConfigGeneratorMethod(_nodeConfig.action);
    }

    _setAxiosCompatibleConfigGeneratorMethod (_action) {
        this.axiosCompatibleConfigGenerator = this[`_${_action}`];

        if (_.isNil(this.axiosCompatibleConfigGenerator)) {
            throw new Error(`Invalid action -> ${_action}`);
        }
    }

    generateAxiosCompatibleConfig (_nodePayload = {}) {
        return this.axiosCompatibleConfigGenerator(_nodePayload = {});
    }
}

module.exports = ApiGroupInterface;
