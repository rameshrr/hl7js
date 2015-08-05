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
    
