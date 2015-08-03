/**
 * Author  : Ramesh R
 * Created : 5/26/2015 10:19 AM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var config = require(__dirname + '/config'),
    parserTypes = require(__dirname + '/parser-types'),
    Message = require(__dirname + '/message'),
    JsonParser = require(__dirname + '/parsers/json-parser')
    ;

var Reader = function (parserType, userConfig) {
    if (!parserType) {
        parserType = parserTypes.BASIC;
    }

    this.parserType = parserType;
    this.config = config.reader;

    if (userConfig) {
        this.setConfig(userConfig);
    }
};

Reader.prototype.setConfig = function (userConfig) {
    for (var key in userConfig) {
        if (this.config.hasOwnProperty(key)) {
            this.config[key] = userConfig[key];
        }
    }
};

Reader.prototype.read = function (data, callback) {
    var reader = this;

    /// Preprocessor macros if any
    this.config.preProcessor(data, function (err, data) {
        if (err) {
            return callback(err);
        }

        var message = new Message();
        message.parse(data, reader.config, function (err) {

            switch (reader.parserType) {

                case parserTypes.BASIC:
                    return callback(err, message);

                case parserTypes.JSON:
                    var jsonParser = new JsonParser();

                    var hl7Json = jsonParser.parse(message.segments, reader.config.grammar, 0);

                    if (hl7Json.err) {
                        return callback(hl7Json.err);
                    }

                    return callback(err, message, hl7Json.jsonMessage);

                default :
                    break
            }

            callback({err: 'Not yet implemented.'});
        });
    });
};

module.exports = Reader;