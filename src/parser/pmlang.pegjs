
prosemakerDoc = f:firstDocSection s:docSection*
                    { var sections = []
                      sections.push(f)
                      return {
                        type: 'document',
                        sections: sections.concat(s)
                    } }

firstDocSection = t:contentChunk*
                    { return {
                      type: 'section',
                      condition: {
                        type: 'condition',
                        content: 'always'
                      },
                      chunks: t
                    } }

docSection = c:conditionExpression t:contentChunk*
                    { return {
                      type: 'section',
                      condition: c,
                      chunks: t
                    } }

contentChunk = r:replacementExpression
                    { return r }
             / t:textChunk
                    { return t }

textChunk = p:plainText
                    { return {
                      type: 'text',
                      content: p
                    } }

// conditions ---------------------------------------------

conditionExpression = "[[" c:condition "]]"
                    { return c }

condition = p:plainText
                    { return {
                      type: 'condition',
                      content: p
                    }}

// replaceables -------------------------------------------

replacementExpression = "{{" optWS r:replaceable optWS "}}"
                    { return r }

replaceable = p:plainText
                    { return {
                      type: 'replaceable',
                      content: p
                    } }

// whitespace ---------------------------------------------

WS = ws:[\n\t ]+    { return ws.join('') }

optWS = ws:WS?      { if (typeof ws === 'undefined') {
                      return ''
                    } else {
                      return ws
                    } }

// text (this gets tedious) -------------------------------

plainText = chars:[a-zA-Z 0-9\n\t\.]+
                    { return chars.join('') }
