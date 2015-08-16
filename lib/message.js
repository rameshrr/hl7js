/**
 * Author  : Ramesh R
 * Created : 8/2/2015 10:36 PM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var utils = require('kalam');

var Segment = require(__dirname + '/segment')
    ;

var Message = function () {
    this.segments = [];
    this.mshSegment = null;

    this.delimiters = require(__dirname + '/delimiters');
};

Message.prototype.parse = function (data, config, callback) {
    if (data.indexOf('MSH') != 0 || data.length < 10) {
        return callback({err: 'Invalid HL7 Message'});
    }

    this.delimiters.fieldSeparater = data[3];
    this.delimiters.componentSeparater = data[4];
    this.delimiters.fieldRepeatSeparater = data[5];
    this.delimiters.escapeCharacter = data[6];
    this.delimiters.subComponentSeparater = data[7];

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

        var segment = new Segment(segments[i]);
        segment.parse(this.delimiters);

        if (i == 0 && segment.id === 'MSH') {
            this.mshSegment = new Segment(segments[i]);
            this.mshSegment.parse(this.delimiters);
        }

        this.segments.push(segment);
    }

    callback(null);
};

Message.prototype.addSegment = function (segmentId, segmentData) {

    if (!segmentId || segmentId.length < 3) {
        throw new Error('Invalid segment');
    }

    if (!segmentData) {
        segmentData = [];
    }

    var segment = new Segment();
    segment.create(segmentId, segmentData);
    this.segments.push(segment);

    return segment;
};

Message.prototype.toString = function (delimiters, config) {

    var segmentData = [];

    for (var i = 0; i < this.segments.length; i++) {
        segmentData.push(this.segments[i].toString(delimiters));
    }

    var lineSeparator = utils.hexToString(config.lineSeparator);
    var prefix = utils.hexToString(config.framePrefix);
    var suffix = utils.hexToString(config.frameSuffix);

    var hl7Msg = segmentData.join(lineSeparator);

    return prefix + hl7Msg + suffix;
};

module.exports = Message;