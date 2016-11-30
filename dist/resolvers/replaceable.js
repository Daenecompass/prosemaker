'use strict';

// resolve replaceables
function resolveReplaceable(replaceable) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // The structure of a replaceable should look like {
  //     value: <replaceableValue>,
  //     transforms: array of [
  //         { name: <transformName>, parameters: [<param1>, <param2>, ...] }
  //     ]
  // }
  var value = replaceable.value;

  if (data[value] !== undefined) {
    value = data[value];
  }
  // - - - - - - - - - - - - - - - - - - - - -
  // now do transforms
  replaceable.transforms.forEach(function (tf) {
    var tfName = tf.name.toLowerCase();
    // check if value is a number
    var isValueNumber = false;
    if (!isNaN(value)) {
      isValueNumber = true;
      value = parseFloat(value);
    }

    if (tfName === 'allcaps') {
      // capitalise all the things
      value = value.toUpperCase();
      // ------------------------
    } else if (tfName === 'nocaps') {
      // make all lowercase
      value = value.toLowerCase();
      // ------------------------
    } else if (tfName === 'absolute') {
      // return absolute value
      if (!isNaN(value)) {
        value = Math.abs(value);
      }
      // ------------------------
    } else if (tfName === 'round') {
      // return rounded value
      if (isValueNumber) {
        //        if (parameters given) {
        //          value = Math.roundParameter(value)
        //        } else {
        value = Math.round(value);
      }
      // ------------------------
    } else if (tfName === 'roundup') {
      // return rounded up value
      if (isValueNumber) {
        value = Math.round(value + 0.5);
      }
      // ------------------------
    } else if (tfName === 'rounddown') {
      // return rounded down value
      if (isValueNumber) {
        value = Math.round(value - 0.5);
      }
      // ------------------------
    } else {
        // unknown transform
        // peforms no transformation
        // returns transform details as string by default
      }
  });
  return value;
};

module.exports = resolveReplaceable;