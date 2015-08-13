/**
 * Author  : Ramesh R
 * Created : 8/2/2015 10:49 AM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var Field = require(__dirname + '/field');
var dict = require(__dirname + '/segments/dict');

var Segment = function (data, delimiters) {
    this.rawData = data;

    this.id = '';
    this.fields = [];

    this.parse(delimiters);
};

Segment.prototype.parse = function (delimiters) {
    var fieldsSplitted = this.rawData.split(delimiters.fieldSeparater);

    var segment = this;

    if (fieldsSplitted.length == 0) {
        return;
    }

    /// Adding Field separator as MSH1
    if (fieldsSplitted[0] === 'MSH') {
        fieldsSplitted.splice(1, 0, delimiters.fieldSeparater);
    }

    for (var i = 0; i < fieldsSplitted.length; i++) {
        segment.fields.push(new Field(fieldsSplitted[i], delimiters));
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

module.exports = Segment;