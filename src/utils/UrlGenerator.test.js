'use strict';

const UrlGenerator = require('./UrlGenerator');

describe('constructor', () => {
    test('creates a default instance', () => {
        const _instance = new UrlGenerator();

        expect(_instance.protocol).toEqual(null);
        expect(_instance.hostName).toEqual(null);
        expect(_instance.port).toEqual(null);
        expect(_instance.pathName).toEqual(null);
        expect(_instance.query).toEqual({});
    });
});

describe('setProtocol (_protocol)', () => {
    test('sets http protocol', () => {
        const _instance = new UrlGenerator();

        _instance.setProtocol('http');

        expect(_instance.protocol).toEqual('http');
    });

    test('sets https protocol', () => {
        const _instance = new UrlGenerator();

        _instance.setProtocol('https');

        expect(_instance.protocol).toEqual('https');
    });

    test('sets https protocol', () => {
        const _instance = new UrlGenerator();

        _instance.setProtocol('ftp');

        expect(_instance.protocol).toEqual('ftp');
    });

    test('returns the UrlGenerator instance', () => {
        const _instance = new UrlGenerator();

        expect(_instance.setProtocol('https')).toEqual(_instance);
    });

    test('throws an error if trying to set an invalid protocol', () => {
        const _instance = new UrlGenerator();

        expect(() => {
            _instance.setProtocol(534);
        }).toThrow('Invalid protocol -> 534');

        expect(() => {
            _instance.setProtocol('invalidprotocol');
        }).toThrow('Invalid protocol -> invalidprotocol');
    });
});

describe('setPort (_port)', () => {
    test('sets a valid port number', () => {
        const _instance = new UrlGenerator();

        _instance.setPort(22);

        expect(_instance.port).toEqual(22);

        _instance.setPort('22');

        expect(_instance.port).toEqual(22);
    });

    test('returns the UrlGenerator instance', () => {
        const _instance = new UrlGenerator();

        expect(_instance.setPort(22)).toEqual(_instance);
    });

    test('throws an error if _port is not a valid port number', () => {
        const _instance = new UrlGenerator();

        expect(() => {
            _instance.setPort(4563675486);
        }).toThrow('Invalid port -> 4563675486');

        expect(() => {
            _instance.setPort(22.33);
        }).toThrow('Invalid port -> 22.33');

        expect(() => {
            _instance.setPort('foo');
        }).toThrow('Invalid port -> foo');

        expect(() => {
            _instance.setPort();
        }).toThrow('Invalid port -> undefined');
    });
});

describe('setHostName (_hostName)', () => {
    test('sets a valid host name', () => {
        const _instance = new UrlGenerator();

        _instance.setHostName('test.autologyx.com');

        expect(_instance.hostName).toEqual('test.autologyx.com');

        _instance.setHostName('http://test.autologyx.com');

        expect(_instance.hostName).toEqual('test.autologyx.com');

        _instance.setHostName('https://test.autologyx.com');

        expect(_instance.hostName).toEqual('test.autologyx.com');

        _instance.setHostName('http://test.autologyx.com/something');

        expect(_instance.hostName).toEqual('test.autologyx.com');

        _instance.setHostName('test.autologyx.com/something');

        expect(_instance.hostName).toEqual('test.autologyx.com');
    });

    test('returns the UrlGenerator instance', () => {
        const _instance = new UrlGenerator();

        expect(_instance.setHostName('test.autologyx.com')).toEqual(_instance);
    });

    test('throws an error if _hostName is not a valid host name', () => {
        const _instance = new UrlGenerator();

        expect(() => {
            _instance.setHostName('training.autologyx');
        }).toThrow('Invalid hostname -> training.autologyx');

        expect(() => {
            _instance.setHostName();
        }).toThrow('Invalid hostname -> undefined');
    });
});
