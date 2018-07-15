'use strict';

const NoAuth = require('./NoAuth');

let _instance = null;

describe('constructor', () => {
    test('creates a default instance', () => {
        _instance = new NoAuth({
            username: 'username',
            password: 'password'
        });

        expect(_instance.authConfig).toEqual({});
    });
});

describe('generateAxiosCompatibleConfig ()', () => {
    test('generates an axios compatible config', () => {
        const _instance = new NoAuth({
            username: 'username',
            password: 'password'
        });

        expect(_instance.generateAxiosCompatibleConfig()).toEqual({});
    });
});
