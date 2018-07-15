'use strict';

const _ = require('lodash');
const ApiGroupInterface = require('./ApiGroupInterface');

const API_EXTRA_PATHNAME = 'targets';

class Targets extends ApiGroupInterface {
    _getMultipleTargets (_nodePayload = {}) {
        this.urlGenerator.setPathName(`${this.API_BASE_PATHNAME}/${API_EXTRA_PATHNAME}`);
        this.urlGenerator.setQuery(_.merge(this.BASE_QUERY_OBJECT, _.pick(_nodePayload, ['limit', 'type', 'offset'])));

        return {
            method: this.METHOD_GET,
            url: this.urlGenerator.generateUrl()
        };
    }

    _getSingleTarget (_nodePayload = {}) {
        this.urlGenerator.setPathName(`${this.API_BASE_PATHNAME}/${API_EXTRA_PATHNAME}/${Targets._extractTargetIdFromPayload(_nodePayload)}`);
        this.urlGenerator.setQuery(this.BASE_QUERY_OBJECT);

        return {
            method: this.METHOD_GET,
            url: this.urlGenerator.generateUrl()
        };
    }

    _createSingleTarget (_nodePayload = {}) {
        this.urlGenerator.setQuery(this.BASE_QUERY_OBJECT);

        return {
            method: this.METHOD_POST,
            url: this.urlGenerator.generateUrl(),
            data: _nodePayload
        };
    }

    _updateSingleTarget (_nodePayload = {}) {
        this.urlGenerator.setPathName(`${this.API_BASE_PATHNAME}/${API_EXTRA_PATHNAME}/${Targets._extractTargetIdFromPayload(_nodePayload)}`);
        this.urlGenerator.setQuery(this.BASE_QUERY_OBJECT);

        return {
            method: this.METHOD_POST,
            url: this.urlGenerator.generateUrl(),
            data: _nodePayload
        };
    }

    _createUpdateSingleTarget (_nodePayload = {}) {
        const _targetId = Targets._extractTargetIdFromPayload(_nodePayload, true) || '';

        this.urlGenerator.setPathName(`${this.API_BASE_PATHNAME}/${API_EXTRA_PATHNAME}/${_targetId}`);
        this.urlGenerator.setQuery(this.BASE_QUERY_OBJECT);

        return {
            method: this.METHOD_POST,
            url: this.urlGenerator.generateUrl(),
            data: _nodePayload
        };
    }

    static _extractTargetIdFromPayload (_nodePayload, _bNotMandatory) {
        const _targetId = typeof _nodePayload === 'string' ? _nodePayload : _.get(_nodePayload, 'targetId', null);

        if (!_targetId) {
            if (_bNotMandatory === true) {
                return null;
            }

            throw new Error(`Node Red node payload missing target ID -> ${JSON.stringify(_nodePayload)}`);
        }

        return _targetId;
    }
}

module.exports = Targets;
