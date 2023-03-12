'use strict';

const nodejs = require('..');
const assert = require('assert').strict;

assert.strictEqual(nodejs(), 'Hello from nodejs');
console.info('nodejs tests passed');
