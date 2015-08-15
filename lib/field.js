/**
 * Author  : Ramesh R
 * Created : 8/2/2015 10:51 AM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var Field = function (data) {

    this.value = data ? data : '';
    this.isComposite = false;
    this.fields = [];
};

Field.prototype.parse = function (delimiters) {
    if (this.value.indexOf(delimiters.componentSeparater) > -1) {
        this.isComposite = true;
        var dataSplitted = this.value.split(delimiters.componentSeparater);

        for (var i = 0; i < dataSplitted.length; i++) {
            var field = new Field(dataSplitted[i]);

            field.parse(delimiters);
            this.fields.push(field);
        }
    }
};

Field.prototype.create = function (fieldData) {

    if (!fieldData) {
        this.value = '';
        return;
    }

    if (fieldData.constructor.name == 'Array') {
        this.isComposite = true;

        for (var i = 0; i < fieldData.length; i++) {
            var field = new Field();

            field.create(fieldData[i]);
            this.fields.push(field);
        }
    } else {
        this.value = fieldData || '';
    }
};

Field.prototype.toString = function (delimiters) {
    if (this.fields.length == 0) {
        return this.value || '';
    }

    var fieldData = [];
    for (var i = 0; i < this.fields.length; i++) {
        fieldData.push(this.fields[i].toString(delimiters));
    }

    return fieldData.join(delimiters.componentSeparater);
};

module.exports = Field;