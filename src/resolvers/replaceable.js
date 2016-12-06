
// resolve replaceables
function resolveReplaceable (replaceable, data = {}) {
  // The structure of a replaceable should look like {
  //     value: <replaceableValue>,
  //     transforms: array of [
  //         { name: <transformName>, parameters: [<param1>, <param2>, ...] }
  //     ]
  // }

  function isNumber (value) {
    if (!isNaN(value)) {
      return true
    } else {
      return false
    }
  }

  let value = replaceable.value
  let tfParams = []

  if (data[value] !== undefined) {
    value = data[value]
  }
  // - - - - - - - - - - - - - - - - - - - - -
  // now do transforms
  replaceable.transforms.forEach((tf) => {
    let tfName = tf.name.toLowerCase()
    if (tf.parameters !== undefined) {
      tfParams = tf.parameters
    }

    // check if value is a number
    let isValueNumber = false
    if (!isNaN(value)) {
      isValueNumber = true
      value = parseFloat(value)
    }

    if (tfName === 'allcaps') {
      // capitalise all the things
      value = value.toUpperCase()
      // ------------------------
    } else if (tfName === 'nocaps') {
      // make all lowercase
      value = value.toLowerCase()
          // ------------------------
    } else if (tfName === 'absolute') {
      // return absolute value
      if (!isNaN(value)) {
        value = Math.abs(value)
      }
      // ------------------------
    } else if (tfName === 'round') {
      // return rounded value
      if (isValueNumber) {
        // if (parameters given) {
        //   value = Math.roundParameter(value)
        // } else {
        value = Math.round(value)
      }
      //  }
      // ------------------------
    } else if (tfName === 'roundup') {
      // return rounded up value
      if (isValueNumber) {
        value = Math.round(value + 0.49)
      }
      // ------------------------
    } else if (tfName === 'rounddown') {
      // return rounded down value
      if (isValueNumber) {
        value = Math.round(value - 0.49)
      }
      // ------------------------
    } else if (tfName === 'add') {
      // return summed value
      if (isValueNumber) {
        tfParams.forEach((p) => {
          console.log(p)
          if (isNumber(p)) {
            value = value + parseFloat(p)
          }
        })
      }
      // ------------------------
    } else if (tfName === 'subtract') {
      // return subtracted value
      if (isValueNumber) {
        tfParams.forEach((p) => {
          console.log(p)
          if (isNumber(p)) {
            value = value - parseFloat(p)
          }
        })
      }
      // ------------------------
    } else {
      // unknown transform
      // peforms no transformation
      // returns transform details as string by default
    }
  })
  return value
};

module.exports = resolveReplaceable
