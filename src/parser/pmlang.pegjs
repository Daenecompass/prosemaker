
prosemakerDoc
  = f:firstDocSection s:docSection*
      { var sections = []
        sections.push(f)
        return {
          type: 'document',
          sections: sections.concat(s)
      } }

firstDocSection
  = t:contentChunk*
      { return {
        type: 'section',
        condition: {
          type: 'condition',
          raw: 'always'
        },
        chunks: t
      } }

docSection
  = c:conditionExpression t:contentChunk*
      { return {
        type: 'section',
        condition: c,
        chunks: t
      } }

contentChunk
  = r:replaceableExpression
      { return r }
  / t:textChunk
      { return t }

textChunk
  = p:plainText
      { return {
        type: 'text',
        raw: p
      } }

// conditions ---------------------------------------------

conditionExpression
  = "[[" c:condition "]]"
      { return c }

condition
  = p:plainText
      { return {
        type: 'condition',
        raw: p
      }}

// replaceables -------------------------------------------

replaceableExpression
  = "{{" optWS r:replaceable optWS "}}"
      { return r }

replaceable
  = v:replaceableValue optWS ","? l:transformList?
      { return {
        type: 'replaceable',
        value: v,
        transforms: l
      } }

transformList
  = t:transform (optWS "," optWS l:transform)*
      { return [t].concat(l) }

transform
  = p:plainText
      { return {
        type: 'transform',
        raw: p,
        args: []
      } }

replaceableValue
  = p:plainText
      { return {
        type: 'replaceableValue',
        raw: p
      } }

// whitespace ---------------------------------------------

WS = ws:[\n\t ]+
      { return ws.join('') }

optWS = ws:WS?
      { if (typeof ws === 'undefined') {
        return ''
      } else {
        return ws
      } }

// text (this gets tedious) -------------------------------

plainText
  = chars:[a-zA-Z 0-9\n\t\.]+
      { return chars.join('') }
