'use strict';

const checkTime = (time) => {
  return parseInt(time) > -1 && Number.isInteger(parseInt(time)) ? true : false
};

const checkMeasure = (measure) => {
  return isNaN(measure) ? true : false
};

module.exports = { checkMeasure, checkTime }