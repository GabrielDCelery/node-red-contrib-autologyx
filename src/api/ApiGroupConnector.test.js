'use strict';

const ApiGroupConnector = require('./ApiGroupConnector');
const Targets = require('./groups/Targets');

jest.mock('./groups/Targets');

function clearMocks () {
    Targets.mockClear();
}

beforeEach(() => {
    clearMocks();
});

afterEach(() => {
    clearMocks();
});

describe('constructor', () => {
    test('creates a default instance', () => {
        const _instance = new ApiGroupConnector();

        expect(_instance.apiGroup).toEqual(null);
    });
});

describe('setConfig (_nodeConfig = {})', () => {
    test('sets connector group to targets', () => {
        const _nodeConfig = { apiGroup: 'targets' };
        const _instance = new ApiGroupConnector().setConfig(_nodeConfig);

        expect(_instance.apiGroup).toBeInstanceOf(Targets);
        expect(Targets).toHaveBeenCalledTimes(1);
        expect(Targets.mock.calls[0][0]).toEqual(_nodeConfig);
    });

    test('throws an error if _nodeConfig doesn\'t define an API group', () => {
        const _instance = new ApiGroupConnector();

        expect(() => {
            _instance.setConfig({});
        }).toThrow(`Node-Red node config missing configuration property -> apiGroup`);
    });

    test('throws an error if trying to use a non existent API group', () => {
        const _instance = new ApiGroupConnector();

        expect(() => {
            _instance.setConfig({ apiGroup: 'somenonexistentapigroup' });
        }).toThrow('Trying to instantiate a non-existent api group -> somenonexistentapigroup');
    });
});
