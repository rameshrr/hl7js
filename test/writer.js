/**
 * Author  : Ramesh R
 * Created : 8/15/2015 11:56 PM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var Writer = require(__dirname + '/../index').Writer;

var fs = require('fs'),
    path = require('path');

var writer = new Writer({
    lineSeparator: '0xC 0xD',
    framePrefix: '',
    frameSuffix: '',
    fieldSeparater: '|',
    componentSeparater: '^',
    fieldRepeatSeparater: '~',
    escapeCharacter: '\\',
    subComponentSeparater: '&'
});

writer.addHeader({
    sendingApplication: 's_app',
    sendingFacility: 'a_facility',
    receivingApplication: 'r_app',
    receivingFacility: 'r_facility',
    dateTimeOfMessage: 'dt',
    security: '',
    messageType: 'ADT^A01',
    messageControlId: '123',
    processingId: '',
    versionId: '2.5',
    sequenceNo: '',
    continuationPointer: '',
    acceptAckType: '',
    applicationAckType: '',
    countryCode: '',
    characterSet: '',
    messageLanguage: ''
});

writer.addSegment('PID', ['name', 1, 2, ['lname', 'fname'], 'eee']);
writer.addSegment('IN1', ['1']);

var hl7Text = writer.toString();
console.log(hl7Text);

fs.writeFile(path.join(__dirname, 'samples/test.hl7'), hl7Text, function (err) {
    console.log(err);
});