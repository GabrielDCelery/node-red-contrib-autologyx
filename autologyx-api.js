'use strict';

const AutologyxApiNodeWrapper = require('./src/AutologyxApiNodeWrapper');

module.exports = function (RED) {
    function AutologyxApiNode(_config) {
        RED.nodes.createNode(this, _config);

        let node = this;
        let autologyxApiNodeWrapper = null;

        try {
            autologyxApiNodeWrapper = new AutologyxApiNodeWrapper().setConfig(_config);
        } catch (_error) {
            return node.error(`The API returned an error: ${_error.message}`);
        }

        node.on('input', _data => {
            autologyxApiNodeWrapper.sendRequest(_data.payload)
                .then(_response => {
                    _data.payload = _response;

                    return node.send([_data, undefined]);
                })
                .catch(_error => {
                    node.error(`The API returned an error: ${_error.message}`);

                    return node.send([undefined, _data]);
                });
        });
    }

    RED.nodes.registerType('autologyx-api', AutologyxApiNode);
}