/**
 * Author  : Ramesh R
 * Created : 8/2/2015 10:49 AM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var Field = require('./field');

var Segment = function (data, delimiters) {
    this.rawData = data;
    this.fields = [];

    this.parse(delimiters);
};

Segment.prototype.parse = function (delimiters) {
    var fieldsSplitted = this.rawData.split(delimiters.fieldSeparater);

    var segment = this;
    for (var i = 0; i < fieldsSplitted.length; i++) {
        segment.fields.push(new Field(fieldsSplitted[i], delimiters));
    }
};

module.exports = Segment;