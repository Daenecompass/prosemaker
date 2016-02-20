
// resolve replaceables

function resolveReplaceable (replaceable, data) {
  // bail if this isn't a replaceable object
  if (replaceable.type !== 'replaceable') {
    return null
  }
  // - - - - - - - - - - - - - - - - - - - - -
  let value = ''
  // is it a literal?
  if (replaceable.value.type === 'replaceableValue') {
    value = replaceable.value.raw
  } else if (replaceable.value.type === 'literal') {
    value = replaceable.value.content
  }

  // - - - - - - - - - - - - - - - - - - - - -
  // now do transforms
  // ... TODO ...

  return value
};

module.exports = resolveReplaceable
