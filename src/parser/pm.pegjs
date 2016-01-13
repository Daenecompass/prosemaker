
prosemakerDoc
  = firstDocSection docSection*

firstDocSection
  = templateText?

docSection
  = condition templateText?

condition
  = "[[" text:conditionText "]]"
  { return "\n(condition): " + text + "\n" }

conditionText
  = plainText

templateText
  = ( replacementExpression / plainText )

replacementExpression
  = "{{" text:replaceable "}}"
  { return "\n(replaceable): " + text + "\n" }

replaceable
  = plainText

plainText
  = chars:[a-zA-Z 0-9]+
  { return chars.join("") }

