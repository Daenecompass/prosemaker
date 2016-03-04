'use strict';

// resolve replaceables

function resolveReplaceable(replaceable, data) {
  // bail if this isn't a replaceable object
  if (replaceable.type !== 'replaceable') {
    return null;
  }
  // - - - - - - - - - - - - - - - - - - - - -
  var value = '';

  if (replaceable.value.type === 'replaceableValue') {
    // is it a replacable?
    value = '[rp>' + replaceable.value.raw + '<rp]';
  } else if (replaceable.value.type === 'literal') {
    // is it a literal?
    value = replaceable.value.content;
  }

  // - - - - - - - - - - - - - - - - - - - - -
  // now do transforms
  // ... TODO ...

  return value;
};

module.exports = resolveReplaceable;