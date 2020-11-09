'use strict';

const checks = require('./function');
const test = require('tape');

test('check time 0', t => {
  const actual = checks.checkTime(0);
  t.equal(actual, true);
  t.end();
});

test('check time 1', t => {
  const actual = checks.checkTime(1);
  t.equal(actual, true);
  t.end();
});

test('check time -1', t => {
  const actual = checks.checkTime(-1);
  t.equal(actual, false);
  t.end();
});

test('check time a', t => {
  const actual = checks.checkTime('a');
  t.equal(actual, false);
  t.end();
});