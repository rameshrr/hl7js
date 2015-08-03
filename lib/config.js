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
        lineSeparator: '',
        framePrefix: '',
        frameSuffix: '',

        parserType: '',

        preProcessor: function (data, callback) {
            callback(null, data);
        },

        postProcessor: function (data, callback) {
            callback(null, data);
        }
    }
};