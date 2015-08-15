/**
 * Author  : Ramesh R
 * Created : 8/2/2015 10:43 AM
 * ----------------------------------------------------------------------
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE', which is part of this source code package.
 * ----------------------------------------------------------------------
 */

'use strict';

var Reader = require(__dirname + '/lib/reader'),
    Writer = require(__dirname + '/lib/writer');

module.exports = {
    Reader: Reader,
    Writer: Writer
};