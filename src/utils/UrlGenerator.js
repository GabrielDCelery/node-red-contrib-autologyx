'use strict';

const url = require('url');
const path = require('path');

const VALID_PROTOCOLS = ['http', 'https', 'ftp'];
const REGEXP_VALID_PORT = new RegExp(/^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/);

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
        this.hostName = new url.URL(_hostName).hostname;

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

    }

    removeQueryParameter () {

    }

    setQueryParameter () {

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
