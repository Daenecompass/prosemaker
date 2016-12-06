{
  var replaceableResolver = require('./resolvers/replaceable')
}

prosemakerDoc
  = f:firstDocSection s:docSection*
      { return f + s.join('') }

firstDocSection
  = t:contentChunk*
      { return t.join('') }

docSection
  = c:conditionExpression t:contentChunk*
      { if (c) { return t.join('') }}
//      else { return c.join('') + t.join('') }

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
  = a: absoluteCondition
      { return a }

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
  = w:word
      { return w }

transformName
  = w:word
      { return w }

parameter
  = optWS i:integer
      { return i }

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

//greaterThanOne
//  = left:integer > 1 { return true }

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
