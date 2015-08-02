/**
 * Author  : Ramesh R
 * Created : 8/2/2015 10:51 AM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var Field = function (data, delimiters) {

    this.value = data;
    this.isComposite = false;
    this.fields = [];

    this.parse(delimiters);
};

Field.prototype.parse = function (delimiters) {
    if (this.value.indexOf(delimiters.componentSeparater) > -1) {
        this.isComposite = true;
        var dataSplitted = this.value.split(delimiters.componentSeparater);

        var mainField = this;

        for (var i = 0; i < dataSplitted.length; i++) {
            mainField.fields.push(new Field(dataSplitted[i], delimiters));
        }
    }
};

module.exports = Field;