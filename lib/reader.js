/**
 * Author  : Ramesh R
 * Created : 5/26/2015 10:19 AM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var config = require('./config'),
    parserTypes = require('./parserTypes'),
    Message = require('./message')
    ;

var Reader = function (parserType) {
    if (!parserType) {
        parserType = parserTypes.BASIC;
    }

    this.parserType = parserType;
};

Reader.prototype.read = function (data, callback) {
    var reader = this;
    var readerConfig = config.reader;

    /// Preprocessor macros if any
    readerConfig.preProcessor(data, function (err, data) {
        if (err) {
            return callback(err);
        }

        var message = new Message();
        message.parse(data, config.reader, function (err) {

            switch (reader.parserType) {

                case parserTypes.BASIC:
                    return callback(err, message);

                default :
                    break
            }

            callback({err: 'Not yet implemented.'});
        });
    });
};

module.exports = Reader;