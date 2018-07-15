'use strict';

const Authenticator = require('./Authenticator');
const NoAuth = require('./methods/NoAuth');
const HTTPBasicAuth = require('./methods/HTTPBasicAuth');

jest.mock('./methods/NoAuth');
jest.mock('./methods/HTTPBasicAuth');

function clearMocks () {
    NoAuth.mockClear();
    HTTPBasicAuth.mockClear();
}

beforeEach(() => {
    clearMocks();
});

afterEach(() => {
    clearMocks();
});

describe('constructor', () => {
    test('creates a default instance', () => {
        const _instance = new Authenticator();

        expect(_instance.authMethod).toEqual(null);
    });
});

describe('setConfig (_nodeConfig = {})', () => {
    test('sets authentication to no auth', () => {
        const _nodeConfig = { authentication: 'noauth' };
        const _instance = new Authenticator().setConfig(_nodeConfig);

        expect(_instance.authMethod).toBeInstanceOf(NoAuth);
        expect(NoAuth).toHaveBeenCalledTimes(1);
        expect(NoAuth.mock.calls[0][0]).toEqual(_nodeConfig);
    });

    test('sets authentication to http basic auth', () => {
        const _nodeConfig = { authentication: 'httpbasic' };
        const _instance = new Authenticator().setConfig(_nodeConfig);

        expect(_instance.authMethod).toBeInstanceOf(HTTPBasicAuth);
        expect(HTTPBasicAuth).toHaveBeenCalledTimes(1);
        expect(HTTPBasicAuth.mock.calls[0][0]).toEqual(_nodeConfig);
    });

    test('throws an error if _nodeConfig doesn\'t define an authentication method', () => {
        const _instance = new Authenticator();

        expect(() => {
            _instance.setConfig({});
        }).toThrow(`Node-Red node config missing configuration property -> authentication`);
    });

    test('throws an error if trying to use a non existent authentication method', () => {
        const _instance = new Authenticator();

        expect(() => {
            _instance.setConfig({ authentication: 'somenonexistentauthmethod' });
        }).toThrow('Trying to instantiate a non-existent authentication class -> somenonexistentauthmethod');
    });
});
