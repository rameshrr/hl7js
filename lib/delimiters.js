'use strict';

module.exports = {
    fieldSeparater: '|',
    componentSeparater: '^',
    fieldRepeatSeparater: '~',
    escapeCharacter: '\\',
    subComponentSeparater: '&',

    get: function () {
        return this.componentSeparater +
            this.fieldRepeatSeparater +
            this.escapeCharacter +
            this.subComponentSeparater;
    }
};
