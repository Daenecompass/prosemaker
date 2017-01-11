
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

  let value = ''

  if (replaceable.varName !== undefined) {
    value = replaceable.varName
    if (data[value] !== undefined) {
      value = data[value]
    }
  } else {
    value = replaceable.literalValue
  }

  let tfParams = []

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
          if (isNumber(p)) {
            value = value - parseFloat(p)
          }
        })
      }
      // ------------------------
    } else if (tfName === 'plural') {
      // return correct plural value
      if (isValueNumber) {
        if (value === 1.0) {
          if (tfParams[0] !== undefined) {
            value = value.toString() + ' ' + tfParams[0]
          } else {
            value = value.toString() + ' ' + '(item)'
          }
        } else if (tfParams[0] !== undefined && tfParams[1] === undefined) {
          value = value.toString() + ' ' + tfParams[0] + 's'
        } else if (tfParams[1] !== undefined) {
          value = value.toString() + ' ' + tfParams[1]
        } else {
          value = value.toString() + ' ' + '(items)'
        }
      }
      // ------------------------
    } else if (tfName === 'change') {
      // return correct change value
      if (isValueNumber) {
        if (value > 0) {
          if (tfParams[0] !== undefined) {
            value = tfParams[0]
          } else {
            value = 'increase'
          }
        } else if (value < 0) {
          if (tfParams[1] !== undefined) {
            value = tfParams[1]
          } else {
            value = 'decrease'
          }
        } else {
          if (tfParams[2] !== undefined) {
            value = tfParams[2]
          } else {
            value = 'change'
          }
        }
      }
      // ------------------------
    } else if (tfName === 'ordinal') {
      // return correct ordinalisation
      if (isValueNumber) {
        value = value.toString()
        if (value.includes('.')) {
          value = value + 'th'
        } else if (value.endsWith('1')) {
          if (!value.endsWith('11')) {
            value = value + 'st'
          } else {
            value = value + 'th'
          }
        } else if (value.endsWith('2')) {
          if (!value.endsWith('12')) {
            value = value + 'nd'
          } else {
            value = value + 'th'
          }
        } else if (value.endsWith('3')) {
          if (!value.endsWith('13')) {
            value = value + 'rd'
          } else {
            value = value + 'th'
          }
        } else {
          value = value + 'th'
        }
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
