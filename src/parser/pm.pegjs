
prosemakerDoc = f:firstDocSection s:docSection*
                    { return '' + f + s.join('') }

firstDocSection = t:templateText?
                    { return '' + t }

docSection = c:condition t:templateText*
                    { return '' + c + t.join('') }

templateText = r:replacementExpression
                    { return '' + r }
             / p:plainText
                    { return '' + p }

// conditions ---------------------------------------------

condition = "[[" text:conditionText "]]"
                    { return '>>COND: ' + text + '<<' }

conditionText = p:plainText
                    { return '' + p }

// replaceables -------------------------------------------

replacementExpression = "{{" optWS text:replaceable optWS "}}"
                    { return '>>REPLACER: ' + text + '<<' }

replaceable = p:plainText
                    { return '' + p }

// whitespace ---------------------------------------------

WS = [\n\t ]+

optWS = WS?

// text (this gets tedious) -------------------------------

plainText = chars:[a-zA-Z 0-9\n\t\.]+
                    { return chars.join('') }
