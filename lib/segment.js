/**
 * Author  : Ramesh R
 * Created : 8/2/2015 10:49 AM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var Field = require(__dirname + '/field'),
    dict = require(__dirname + '/segments/dict');

var Segment = function (data) {
    this.rawData = data ? data : '';

    this.id = '';
    this.fields = [];
};

Segment.prototype.parse = function (delimiters) {
    var fieldsSplitted = this.rawData.split(delimiters.fieldSeparater);

    if (fieldsSplitted.length == 0) {
        return;
    }

    /// Adding Field separator as MSH1
    if (fieldsSplitted[0] === 'MSH') {
        fieldsSplitted.splice(1, 0, delimiters.fieldSeparater);
    }

    for (var i = 0; i < fieldsSplitted.length; i++) {
        var field = new Field(fieldsSplitted[i]);

        field.parse(delimiters);
        this.fields.push(field);
    }

    this.id = this.fields[0].value;
    this.prettyfy(delimiters);
};

Segment.prototype.prettyfy = function (delimiters) {

    for (var i = 0; i < this.fields.length; i++) {
        this[i] = this.fields[i].value;
    }

    var defn = dict[this.id];
    if (defn) {
        for (var key in defn) {
            this[defn[key]] = this[key];
        }
    }
};

Segment.prototype.create = function (segmentId, segmentData) {

    if (segmentData.length == 0) {
        return;
    }

    for (var i = 0; i < segmentData.length; i++) {
        var field = new Field();

        field.create(segmentData[i]);
        this.fields.push(field);
    }

    this.id = segmentId;
};

Segment.prototype.toString = function (delimiters) {

    var fieldData = [this.id];

    for (var i = 0; i < this.fields.length; i++) {
        fieldData.push(this.fields[i].toString(delimiters));
    }

    return fieldData.join(delimiters.fieldSeparater);
};


module.exports = Segment;