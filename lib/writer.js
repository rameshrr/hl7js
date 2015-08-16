/**
 * Author  : Ramesh R
 * Created : 8/15/2015 2:10 PM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var Message = require(__dirname + '/message'),
    config = require(__dirname + '/config'),
    dict = require(__dirname + '/segments/dict');

var Writer = function (userConfig) {

    this.config = config.writer;
    this.delimiters = require(__dirname + '/delimiters');

    if (userConfig) {
        this.setConfig(userConfig);
    }

    this.message = new Message();
};

Writer.prototype.setConfig = function (userConfig) {
    for (var key in userConfig) {
        if (this.config.hasOwnProperty(key)) {
            this.config[key] = userConfig[key];
        }
    }

    for (var key in userConfig) {
        if (this.delimiters.hasOwnProperty(key)) {
            this.delimiters[key] = userConfig[key];
        }
    }
};

Writer.prototype.addHeader = function (headerInfo) {

    var headerData = [];
    headerData.push(this.delimiters.get());

    var mshFields = dict['MSH'];
    for (var key in mshFields) {

        var fieldIndex = parseInt(key) - 2;

        if (fieldIndex < 1) {
            continue;
        }

        headerData[fieldIndex] = headerInfo[mshFields[key]];
    }

    return this.message.addSegment('MSH', headerData);
};

Writer.prototype.addSegment = function (segmentId, data) {
    return this.message.addSegment(segmentId, data);
};

Writer.prototype.toString = function () {
    return this.message.toString(this.delimiters, this.config);
};

module.exports = Writer;