'use strict';

module.exports = {
    reader: {
        lineSeparator: '',
        framePrefix: '',
        frameSuffix: ''
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