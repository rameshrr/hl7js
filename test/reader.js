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
var Reader = require(__dirname + '/../index').Reader;

var adtPath = 'samples/adt.hl7';
var oruPath = 'samples/oru.hl7';

var adtGrammar = [
    {
        id: 'MSH',
        required: true
    },
    {
        id: 'PID',
        required: true
    },
    {
        id: 'NK1',
        required: false
    },
    {
        id: 'PV1',
        required: true
    }
];

var oruGrammar = [
    {
        id: 'MSH',
        required: true
    },
    {
        id: 'PID',
        required: true
    },
    {
        id: 'OBR',
        required: true,
        isGroup: true,
        isArray: true,

        grammar: [
            {
                id: 'OBX',
                required: true,
                isArray: true
            }
        ]
    }
];

/// Basic Parsing
fs.readFile(path.join(__dirname, adtPath), function (err, buffer) {
    var reader = new Reader();

    reader.read(buffer.toString(), function (err, hl7Data) {
        console.log(err);
        console.log(hl7Data);
    });
});

/// JSON Parsing
fs.readFile(path.join(__dirname, adtPath), function (err, buffer) {
    var reader = new Reader('JSON', {
        grammar: adtGrammar
    });

    reader.read(buffer.toString(), function (err, hl7Data, hl7Json) {
        console.log(err);
        console.log(hl7Data);
        console.log(hl7Json);

        var patientName = hl7Json['PID'][5];
    });
});

fs.readFile(path.join(__dirname, oruPath), function (err, buffer) {
    var reader = new Reader('JSON', {
        grammar: oruGrammar
    });

    reader.read(buffer.toString(), function (err, hl7Data, hl7Json) {
        console.log(err);
        console.log(hl7Data);
        console.log(hl7Json);

        var patientName = hl7Json['PID'][5]; /// Similar pattern: hl7Json['PID'].fields[5].value ==> For advanced usage
    });
});