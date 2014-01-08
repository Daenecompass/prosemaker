
import sys
sys.path.insert(0, './src/dwb/prosemaker')

from prosemaker import ProseMaker
from docpart import DocPart

pm = ProseMaker()

pm.data = {
    'a': 'asdf',
    'b': 'bsdf'
}

pm.source = "test"
print '::', pm.source, '::   >>>>> gives >>>>>   ::', pm.doc, "::\n"

pm.source = "[[always]]test"
print '::', pm.source, '::   >>>>> gives >>>>>   ::', pm.doc, "::\n"

pm.source = "[[never]]NeVeR[[always]]AlWaYs"
print '::', pm.source, '::   >>>>> gives >>>>>   ::', pm.doc, "::\n"


from parsimonious.grammar import Grammar
grammar = Grammar(
    """
    bold_text  = bold_open text bold_close
    text       = ~"[A-Z 0-9]*"i
    bold_open  = "(("
    bold_close = "))"
    """)
print grammar.parse('((bold stuff))')
