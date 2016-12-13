{
  var replaceableResolver = require('./resolvers/replaceable')
  var lookupComparator = require('./resolvers/comparators')
}

prosemakerDoc
  = f:firstDocSection s:docSection*
      { return f + s.join('') }

firstDocSection
  = t:contentChunk*
      { return t.join('') }

docSection
  = c:conditionExpression t:contentChunk*
      {
        // c is a string if it is an unrecognised condition
        if (typeof c === 'string') {
          return '[[' + c + ']]' + t.join('')
        } else if (c) {
          return t.join('')
        } else {
          // if c is false text is not included in output
        }
      }

contentChunk
  = r:replaceableExpression
      { return r }
  / t:textChunk
      { return t }

textChunk
  = p:plainText
      { return p }

// conditions ---------------------------------------------

conditionExpression
  = "[[" c:condition "]]"
      { return c }

condition
  = a:absoluteCondition
      { return a }
  / cc:comparisonCondition
      { return cc }
//  / r:rangeCondition
  / u:unrecognisedCondition
      {return u }

absoluteCondition
  = a:alwaysCondition
      { return a }
  / n:neverCondition
      { return n }

alwaysCondition
  = optWS word:'always'i optWS
      { return true }

neverCondition
  = optWS word:'never'i optWS
      { return false }

comparisonCondition
  = optWS left:word optWS cp:comparator optWS right:word optWS
      { if (lookupComparator[cp] !== undefined) {
        return lookupComparator[cp](left, right)
        } else {
          return text()
        }
      }

unrecognisedCondition
  = p:plainText
    { return p }

// replaceables -------------------------------------------

replaceableExpression
  = "{{" optWS r:replaceable optWS "}}"
      { return replaceableResolver(r, options.data) }

replaceable
  = v:replaceableValue t:transform*
      { return { value:v, transforms:t } }

transform
  = optWS ',' optWS n:transformName p:parameter*
      { return { name:n, parameters:p} }

replaceableValue
  = c:valueChunk*
      { return c.join('') } // todo

valueChunk
  = w:word { return w }
  / r:replaceableExpression { return r }

transformName
  = w:word
      { return w }

parameter
  = optWS i:integer
      { return i }
  / optWS w:word
      { return w }

// whitespace ---------------------------------------------

WS
  = ws:[\n\t ]+
    { return ws.join('') }

optWS
  = ws:WS?
    { if (typeof ws === 'undefined') {
      return ''
    } else {
      return ws
    } }

// comparators --------------------------------------------

comparator
  = chars:[=<>!]+
      { return chars.join('') }

// arithmatic ---------------------------------------------

integer 'integer'
  = chars:[0-9.]+
      { return parseFloat(chars.join(''), 10); }

// text (this gets tedious) -------------------------------

plainText
  = chars:[a-zA-Z0-9 \n\r\t.,()-><]+
      { return chars.join('') }

word
  = chars:[a-zA-Z0-9\._]+
      { return chars.join('') }
