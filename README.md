# hl7js (Beta)
Node.js package for parsing and writing HL7 files


# Installation
install via [NPM](https://www.npmjs.com/):
> npm install hl7js

# Usage
## Initializing:
```javascript

var Reader = require('hl7js').Reader;
var reader = new Reader();

```

## reader.read(buffer, callback)
```javascript

/// Basic Parsing
fs.readFile(path.join(__dirname, adtPath), function (err, buffer) {

    reader.read(buffer.toString(), function (err, hl7Data) {
        console.log(err);
        console.log(hl7Data);
    });
});

```
## Parsing with Grammar

### Defining grammar
```javascript

/// Format
var grammar = [
{
    id: 'Segment_ID',
    required: true,
    isGroup: true,
    isArray: true,

    grammar: [
    ]
];

/// Example
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

```

### Reading With Grammar
```javascript

var reader = new Reader('JSON', {
    grammar: adtGrammar
});

fs.readFile(path.join(__dirname, oruPath), function (err, buffer) {

    reader.read(buffer.toString(), function (err, hl7Data, hl7Json) {
        console.log(err);
        console.log(hl7Data);
        console.log(hl7Json);

        var patientName = hl7Json['PID'][5]; /// Similar pattern: hl7Json['PID'].fields[5].value ==> For advanced usage
    });
});

```

# Documentation
### Reading patient name
```javascript

var patientName = hl7Json['PID'][5];
/// (or)
var patientName = hl7Json['PID'].fields[5].value

```

# Contributions
Contributions are welcome
    
# Issues 
Please file your issues [here](https://github.com/rameshrr/hl7js/issues):
    
