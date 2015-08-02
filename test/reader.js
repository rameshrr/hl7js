/**
 * Author  : Ramesh R
 * Created : 8/2/2015 10:45 AM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var fs = require('fs');
var path = require('path');
var Reader = require('../index').Reader;

var sampleDcmPath = 'samples/adt.hl7';


fs.readFile(path.join(__dirname, sampleDcmPath), function (err, buffer) {
    var reader = new Reader();

    reader.read(buffer.toString(), function (err, hl7Data) {
        console.log(err);
        console.log(hl7Data);
    });
});