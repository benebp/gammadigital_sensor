'use strict';

const checkTime = (time) => {
  return time > -1 && Number.isInteger(time) ? true : false
};

const checkMeasure = (measure) => {
  return isNaN(measure) ? true : false
};

module.exports = { checkMeasure, checkTime }