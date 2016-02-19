module.exports = (function() {
  "use strict";

  /*
   * Generated by PEG.js 0.9.0.
   *
   * http://pegjs.org/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.location = location;
    this.name     = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  function peg$DefaultTracer() {
    this.indentLevel = 0;
  }

  peg$DefaultTracer.prototype.trace = function(event) {
    var that = this;

    function log(event) {
      function repeat(string, n) {
         var result = "", i;

         for (i = 0; i < n; i++) {
           result += string;
         }

         return result;
      }

      function pad(string, length) {
        return string + repeat(" ", length - string.length);
      }

      if (typeof console === "object") {
        console.log(
          event.location.start.line + ":" + event.location.start.column + "-"
            + event.location.end.line + ":" + event.location.end.column + " "
            + pad(event.type, 10) + " "
            + repeat("  ", that.indentLevel) + event.rule
        );
      }
    }

    switch (event.type) {
      case "rule.enter":
        log(event);
        this.indentLevel++;
        break;

      case "rule.match":
        this.indentLevel--;
        log(event);
        break;

      case "rule.fail":
        this.indentLevel--;
        log(event);
        break;

      default:
        throw new Error("Invalid event type: " + event.type + ".");
    }
  };

  function peg$parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        parser  = this,

        peg$FAILED = {},

        peg$startRuleFunctions = { prosemakerDoc: peg$parseprosemakerDoc },
        peg$startRuleFunction  = peg$parseprosemakerDoc,

        peg$c0 = function(f, s) { var sections = []
                              sections.push(f)
                              return {
                                type: 'document',
                                sections: sections.concat(s)
                            } },
        peg$c1 = function(t) { return {
                              type: 'section',
                              condition: {
                                type: 'condition',
                                raw: 'always'
                              },
                              chunks: t
                            } },
        peg$c2 = function(c, t) { return {
                              type: 'section',
                              condition: c,
                              chunks: t
                            } },
        peg$c3 = function(r) { return r },
        peg$c4 = function(t) { return t },
        peg$c5 = function(p) { return {
                              type: 'text',
                              raw: p
                            } },
        peg$c6 = "[[",
        peg$c7 = { type: "literal", value: "[[", description: "\"[[\"" },
        peg$c8 = "]]",
        peg$c9 = { type: "literal", value: "]]", description: "\"]]\"" },
        peg$c10 = function(c) { return c },
        peg$c11 = function(p) { return {
                              type: 'condition',
                              raw: p
                            }},
        peg$c12 = "{{",
        peg$c13 = { type: "literal", value: "{{", description: "\"{{\"" },
        peg$c14 = "}}",
        peg$c15 = { type: "literal", value: "}}", description: "\"}}\"" },
        peg$c16 = function(p) { return {
                              type: 'replaceable',
                              raw: p
                            } },
        peg$c17 = /^[\n\t ]/,
        peg$c18 = { type: "class", value: "[\\n\\t ]", description: "[\\n\\t ]" },
        peg$c19 = function(ws) { return ws.join('') },
        peg$c20 = function(ws) { if (typeof ws === 'undefined') {
                              return ''
                            } else {
                              return ws
                            } },
        peg$c21 = /^[a-zA-Z 0-9\n\t.]/,
        peg$c22 = { type: "class", value: "[a-zA-Z 0-9\\n\\t\\.]", description: "[a-zA-Z 0-9\\n\\t\\.]" },
        peg$c23 = function(chars) { return chars.join('') },

        peg$currPos          = 0,
        peg$savedPos         = 0,
        peg$posDetailsCache  = [{ line: 1, column: 1, seenCR: false }],
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$tracer = "tracer" in options ? options.tracer : new peg$DefaultTracer(),

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function error(message) {
      throw peg$buildException(
        message,
        null,
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos],
          p, ch;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line:   details.line,
          column: details.column,
          seenCR: details.seenCR
        };

        while (p < pos) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails   = peg$computePosDetails(endPos);

      return {
        start: {
          offset: startPos,
          line:   startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line:   endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, found, location) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0100-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1000-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new peg$SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        location
      );
    }

    function peg$parseprosemakerDoc() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "prosemakerDoc",
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsefirstDocSection();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsedocSection();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsedocSection();
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c0(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "prosemakerDoc",
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "prosemakerDoc",
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsefirstDocSection() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "firstDocSection",
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsecontentChunk();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsecontentChunk();
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c1(s1);
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "firstDocSection",
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "firstDocSection",
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsedocSection() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "docSection",
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseconditionExpression();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsecontentChunk();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsecontentChunk();
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "docSection",
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "docSection",
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecontentChunk() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "contentChunk",
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parsereplaceableExpression();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c3(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsetextChunk();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c4(s1);
        }
        s0 = s1;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "contentChunk",
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "contentChunk",
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsetextChunk() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "textChunk",
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseplainText();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c5(s1);
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "textChunk",
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "textChunk",
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseconditionExpression() {
      var s0, s1, s2, s3,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "conditionExpression",
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c6) {
        s1 = peg$c6;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c7); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecondition();
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c8) {
            s3 = peg$c8;
            peg$currPos += 2;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c9); }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c10(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "conditionExpression",
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "conditionExpression",
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsecondition() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "condition",
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseplainText();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c11(s1);
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "condition",
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "condition",
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsereplaceableExpression() {
      var s0, s1, s2, s3, s4, s5,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "replaceableExpression",
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c12) {
        s1 = peg$c12;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c13); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseoptWS();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsereplaceable();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseoptWS();
            if (s4 !== peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c14) {
                s5 = peg$c14;
                peg$currPos += 2;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c15); }
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c3(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "replaceableExpression",
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "replaceableExpression",
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parsereplaceable() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "replaceable",
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseplainText();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c16(s1);
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "replaceable",
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "replaceable",
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseWS() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "WS",
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = [];
      if (peg$c17.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c18); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c17.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c18); }
          }
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c19(s1);
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "WS",
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "WS",
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseoptWS() {
      var s0, s1,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "optWS",
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = peg$parseWS();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c20(s1);
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "optWS",
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "optWS",
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    function peg$parseplainText() {
      var s0, s1, s2,
          startPos = peg$currPos;

      peg$tracer.trace({
        type:     "rule.enter",
        rule:     "plainText",
        location: peg$computeLocation(startPos, startPos)
      });

      s0 = peg$currPos;
      s1 = [];
      if (peg$c21.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c22); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c21.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c22); }
          }
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c23(s1);
      }
      s0 = s1;

      if (s0 !== peg$FAILED) {
        peg$tracer.trace({
          type:   "rule.match",
          rule:   "plainText",
          result: s0,
          location: peg$computeLocation(startPos, peg$currPos)
        });
      } else {
        peg$tracer.trace({
          type: "rule.fail",
          rule: "plainText",
          location: peg$computeLocation(startPos, startPos)
        });
      }

      return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(
        null,
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length
          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }

  return {
    SyntaxError:   peg$SyntaxError,
    DefaultTracer: peg$DefaultTracer,
    parse:         peg$parse
  };
})();