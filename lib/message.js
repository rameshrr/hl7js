/**
 * Author  : Ramesh R
 * Created : 8/2/2015 10:36 PM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var delimiters = require(__dirname + '/delimiters'),
    parserTypes = require(__dirname + '/parser-types'),
    Segment = require(__dirname + '/segment')
    ;

var Message = function () {
    this.segments = [];
};

Message.prototype.parse = function (data, config, callback) {
    if (data.indexOf('MSH') != 0 || data.length < 10) {
        return callback({err: 'Invalid HL7 Message'});
    }

    delimiters.fieldSeparater = data[3];
    delimiters.componentSeparater = data[4];
    delimiters.fieldRepeatSeparater = data[5];
    delimiters.escapeCharacter = data[6];
    delimiters.subComponentSeparater = data[7];

    this.readSegments(data, config, function (err) {
        callback(err);
    });
};

Message.prototype.readSegments = function (data, config, callback) {
    var segments = data.split(config.lineSeparator);

    for (var i = 0; i < segments.length; i++) {
        if (!segments[i] || segments[i].length < 3) {
            continue;
        }

        var segment = new Segment(segments[i], delimiters);
        this.segments.push(segment);
    }

    callback(null);
};

module.exports = Message;