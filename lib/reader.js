/**
 * Created by Ramesh on 5/26/2015.
 */

'use strict';

var delimiters = require('./delimiters'),
    config = require('./config'),
    parserTypes = require('./parserTypes')
    ;

var Reader = function (parserType) {
    this.parserType = parserType;
};

Reader.prototype.read = function (data, callback) {
    var readerConfig = config.reader;
    var reader = this;

    /// Preprocessor macros if any
    readerConfig.preProcessor(data, function (err, data) {
        if (err) {
            return callback(err);
        }

        var segments = reader.getSegments(data, readerConfig, function (err, hl7Segments) {
            switch (reader.parserType) {
                case parserTypes.BASIC:
                    break;
                default :
                    break
            }
        });
    });
};

Reader.prototype.getSegments = function (data, config, callback) {
    var segments = data.split(readerConfig.lineSeparator);
};