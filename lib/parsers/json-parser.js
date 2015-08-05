/**
 * Author  : Ramesh R
 * Created : 8/3/2015 11:00 PM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var JsonMessage = require(__dirname + '/json-message');

var Parser = function () {
};

Parser.prototype.parse = function (segments, grammar, currentIndex) {

    var jsonMessage = new JsonMessage();

    if (!grammar || grammar.length == 0) {
        return {err: 'Could not parse message. No grammar'};
    }

    for (var i = 0; i < grammar.length; i++) {

        if (grammar[i].required && grammar[i].id != segments[currentIndex].id) {
            return {err: 'Could not parse message. Invalid grammar/message '};
        }

        /// Optional segment, but not matching - just skip
        if (segments[currentIndex] && grammar[i].id != segments[currentIndex].id) {
            continue;
        }

        /// Skip - EOF
        if(!segments[currentIndex]) {
            continue;
        }

        if (grammar[i].id == segments[currentIndex].id) {

            if (grammar[i].isArray) {

                jsonMessage[grammar[i].id] = [];
                var jsonArray = jsonMessage[grammar[i].id];

                while (currentIndex < segments.length && grammar[i].id == segments[currentIndex].id) {

                    jsonArray.push(segments[currentIndex]);
                    currentIndex++;

                    if (grammar[i].isGroup) {
                        var groupData = this.parse(segments, grammar[i].grammar, currentIndex);

                        jsonArray[jsonArray.length - 1].childs = groupData.jsonMessage;
                        currentIndex = groupData.currentIndex;
                    }
                }
            } else if (grammar[i].isGroup) {
                jsonMessage[grammar[i].id] = segments[currentIndex];

                currentIndex++;
                var groupData = this.parse(segments, grammar[i].grammar, currentIndex);
                jsonMessage[grammar[i].id].childs = groupData.jsonMessage;
                currentIndex = groupData.currentIndex;
            } else {
                jsonMessage[grammar[i].id] = segments[currentIndex];
                currentIndex++;
            }
        }
    }

    return {currentIndex: currentIndex, jsonMessage: jsonMessage};
};

module.exports = Parser;