'use strict';

const Authenticator = require('./Authenticator');
const NoAuth = require('./authenticationMethods/NoAuth');
const HTTPBasicAuth = require('./authenticationMethods/HTTPBasicAuth');

describe('constructor', () => {
    test('creates a default instance', () => {
        const _instance = new Authenticator();

        expect(_instance.authMethod).toEqual(null);
    });
});

describe('setAuthenticationMethod(_plainNodeRedNodeConfig)', () => {
    test('uses no auth', () => {

    });

    test('uses http basic auth', () => {

    });

    test('throws an error if authentication method does not exist', () => {
        const _instance = new Authenticator();
    });
});