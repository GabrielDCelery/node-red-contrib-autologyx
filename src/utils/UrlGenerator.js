'use strict';

const _ = require('lodash');
const url = require('url');
const path = require('path');

const VALID_PROTOCOLS = ['http', 'https', 'ftp'];
const REGEXP_VALID_PORT = new RegExp(/^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/);
const REGEXP_VALID_URL = new RegExp(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?$/);
const REGEXP_VALID_HOSTNAME = new RegExp(/^[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?$/);
const REGEXP_PROTOCOL = new RegExp(/(^\w+:|^)\/\//);

class UrlGenerator {
    constructor () {
        this.protocol = null;
        this.hostName = null;
        this.port = null;
        this.pathName = null;
        this.query = {};
    }

    setProtocol (_protocol) {
        if (VALID_PROTOCOLS.indexOf(_protocol) === -1) {
            throw new Error(`Invalid protocol -> ${_protocol}`);
        }

        this.protocol = _protocol;

        return this;
    }

    setHostName (_hostName) {
        if (_.isNil(_hostName)) {
            throw new Error(`Invalid hostname -> ${_hostName}`);
        }

        let _normalizedHostName = _hostName;

        if (REGEXP_VALID_URL.test(_normalizedHostName)) {
            _normalizedHostName = _normalizedHostName.replace(REGEXP_PROTOCOL, '');
        }

        _normalizedHostName = _normalizedHostName.split('/')[0];

        if (!REGEXP_VALID_HOSTNAME.test(_normalizedHostName)) {
            throw new Error(`Invalid hostname -> ${_normalizedHostName}`);
        }

        this.hostName = _normalizedHostName;

        return this;
    }

    setPort (_port) {
        if (!REGEXP_VALID_PORT.test(_port)) {
            throw new Error(`Invalid port -> ${_port}`);
        }

        this.port = parseInt(_port, 10);

        return this;
    }

    setPathName (_pathName) {
        this.pathName = typeof _pathName === 'string' ? _pathName : path.join(_pathName);

        return this;
    }

    resetQuery () {
        this.query = {};

        return this;
    }

    removeQueryParameter () {
        return this;
    }

    setQueryParameter () {
        return this;
    }

    setQuery (_query) {
        this.query = _query;

        return this;
    }

    generateUrl () {
        return url.format({
            protocol: this.protocol,
            hostname: this.hostName,
            port: this.port,
            pathname: this.pathName,
            query: this.query
        });
    }
}

module.exports = UrlGenerator;
