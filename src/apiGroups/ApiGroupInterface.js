'use strict';

const _ = require('lodash');
const UrlGenerator = require('../utils/UrlGenerator');

const PROTOCOL = 'https';
const DEFAULT_PORT = 443;
const METHOD_GET = 'get';
const METHOD_POST = 'post';
const API_BASE_PATHNAME = 'api/v1/';

class ApiGroupInterface {
    constructor(_nodeConfig) {
        this.METHOD_GET = METHOD_GET;
        this.METHOD_POST = METHOD_POST;
        this.API_BASE_PATHNAME = API_BASE_PATHNAME;
        this.BASE_QUERY_OBJECT = {
            connector: ApiGroupInterface._extractPropertyFromNodeConfig(_nodeConfig, 'connector'),
            apiKey: ApiGroupInterface._extractPropertyFromNodeConfig(_nodeConfig, 'apiKey')
        };
        this.urlGenerator = new UrlGenerator()
            .setProtocol(PROTOCOL)
            .setPort(_nodeConfig.port || DEFAULT_PORT)
            .setHostName(_nodeConfig.hostname);
        this._setAxiosCompatibleConfigGeneratorMethod(_nodeConfig.action);
    }

    _setAxiosCompatibleConfigGeneratorMethod(_action) {
        this.axiosCompatibleConfigGenerator = this[`_${_action}`];

        if (_.isNil(this.axiosCompatibleConfigGenerator)) {
            throw new Error(`Invalid action -> ${_action}`)
        }
    }

    generateAxiosCompatibleConfig(_nodePayload = {}) {
        return this.axiosCompatibleConfigGenerator(_nodePayload = {});
    }

    static _extractPropertyFromNodeConfig (_nodeConfig, _propertyName) {
        const _extracted = _.get(_nodeConfig, _propertyName, null);

        if (!_extracted) {
            throw new Error(`Node-Red node config missing configuration property -> ${_propertyName}`);
        }

        return _extracted;
    }
}

module.exports = ApiGroupInterface;