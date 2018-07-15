'use strict';

const AutologyxApiNode = require('./src/AutologyxApiNode');

module.exports = function (RED) {
    function AutologyxApiNodeWrapper (_config) {
        RED.nodes.createNode(this, _config);

        let node = this;
        let autologyxApiNode = null;

        try {
            autologyxApiNode = new AutologyxApiNode().setConfig(_config);
        } catch (_error) {
            return node.error(`The API returned an error: ${_error.message}`);
        }

        node.on('input', _data => {
            autologyxApiNode.sendRequest(_data.payload)
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

    RED.nodes.registerType('autologyx-api', AutologyxApiNodeWrapper);
}
;