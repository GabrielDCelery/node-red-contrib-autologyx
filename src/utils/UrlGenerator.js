'use strict';

const url = require('url');
const path = require('path');

const VALID_PROTOCOLS = ['https'];

class UrlGenerator {
    constructor() {
        this.protocol = null;
        this.hostName = null;
        this.port = null;
        this.pathName = null;
        this.query = null;
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
        if (isNaN(_port) || _port < 0 || _port > 65535) {
            throw new Error(`Invalid port -> ${_port}`);
        }

        this.port = _port;

        return this;
    }

    setPathName (_pathName) {
        this.pathName = typeof _pathName === 'string' ? _pathName : path.join(_pathName);

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