var lookupComparator = {
  '==': (left, right) => (left === right),
  '!=': (left, right) => (left !== right),
  '<': (left, right) => (left < right),
  '<=': (left, right) => (left <= right),
  '>': (left, right) => (left > right),
  '>=': (left, right) => (left >= right)
}

module.exports = lookupComparator
