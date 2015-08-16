# hl7js (Beta)
Node.js package for parsing and writing HL7 files


# Installation
install via [NPM](https://www.npmjs.com/):
> npm install hl7js

# Usage
## Initializing Reader:
```javascript

var Reader = require('hl7js').Reader;
var reader = new Reader();

```

## reader.read(buffer, callback)
```javascript

/// Basic Parsing
var reader = new Reader('BASIC');
fs.readFile(hl7_file_path, function (err, buffer) {

    reader.read(buffer.toString(), function (err, hl7Data) {
        console.log(err);
        console.log(hl7Data);
    });
});

```

## Reading With Grammar
### reader.read(buffer, grammarExpression, callback)

```javascript

fs.readFile(hl7_file_path, function (err, buffer) {

    reader.read(buffer.toString(), 'MSH PID [{OBR {OBX}}]', function (err, hl7Data, hl7Json) {
            console.log(err);

            if (!err) {
                var patientName = hl7Json['PID'][5]; /// Similar pattern: hl7Json['PID'].fields[5].value ==> For advanced usage
                console.log('ORU->Patient name: ', patientName);
            }
    });
});

```

### Reading header fields
```javascript

var messageType = hl7Data.mshSegment.messageType;

```

### Reading patient name
```javascript

var patientName = hl7Json['PID'][5];
/// (or)
var patientName = hl7Json['PID'].fields[5].value;

```

## Initializing Writer: (Alpha version)
```javascript

var Writer = require('hl7js').Writer;

/// Initializing writer with default delimiters
var writer = new Writer();
/// Initializing writer with user defined delimiters
var writer = new Writer({
    lineSeparator: '0xD 0xA',
    framePrefix: '',
    frameSuffix: '',
    fieldSeparater: '|',
    componentSeparater: '^',
    fieldRepeatSeparater: '~',
    escapeCharacter: '\\',
    subComponentSeparater: '&'
});

```

## writer.addHeader(options) - adding MSH
```javascript

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

```

## writer.addSegment(segmentId [, dataArray]) - Adding Other segments
```javascript

writer.addSegment('PID', ['name', 1, 2, ['lname', 'fname'], 'eee']);
writer.addSegment('IN1', ['1']);
writer.addSegment('IN2');

```

## writer.toString() - Reads HL7 Text
```javascript

var hl7Text = writer.toString();
console.log(hl7Text);

```

# Contributions
Contributions are welcome
    
# Issues 
Please file your issues [here](https://github.com/rameshrr/hl7js/issues):
    
