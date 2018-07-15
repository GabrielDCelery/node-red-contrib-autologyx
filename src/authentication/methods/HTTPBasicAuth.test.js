'use strict';

const HTTPBasicAuth = require('./HTTPBasicAuth');

let _instance = null;

describe('constructor', () => {
    test('creates a default instance', () => {
        _instance = new HTTPBasicAuth({
            username: 'username',
            password: 'password'
        });

        expect(_instance.authConfig).toEqual({
            username: 'username',
            password: 'password'
        });
    });

    test('throws an error if node configuration doesn\'t have username', () => {
        expect(() => {
            _instance = new HTTPBasicAuth({
                password: 'password'
            });
        }).toThrow(`Node-Red node config missing configuration property -> username`);
    });

    test('throws an error if node configuration doesn\'t have password', () => {
        expect(() => {
            _instance = new HTTPBasicAuth({
                username: 'username'
            });
        }).toThrow(`Node-Red node config missing configuration property -> password`);
    });
});

describe('generateAxiosCompatibleConfig ()', () => {
    test('generates an axios compatible config', () => {
        _instance = new HTTPBasicAuth({
            username: 'username',
            password: 'password'
        });

        expect(_instance.generateAxiosCompatibleConfig()).toEqual({
            auth: {
                username: 'username',
                password: 'password'
            }
        });
    });
});
