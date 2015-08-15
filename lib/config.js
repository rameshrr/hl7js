'use strict';

module.exports = {
    reader: {
        lineSeparator: '\r\n',
        framePrefix: '',
        frameSuffix: '',

        grammar: [
        ],

        /// Dummy Preprocessor
        preProcessor: function(data, callback) {
            callback(null, data);
        }
    },

    writer: {
        lineSeparator: '0xD 0xA',
        framePrefix: '0xB',
        frameSuffix: '0x1C 0xD',

        preProcessor: function (data, callback) {
            callback(null, data);
        },

        postProcessor: function (data, callback) {
            callback(null, data);
        }
    }
};