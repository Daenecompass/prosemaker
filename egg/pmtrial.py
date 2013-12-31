
import sys
sys.path.insert(0, './dwb.prosemaker/src/dwb/prosemaker')

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


# dm = DocPart('[[condition]]asdfasdf')

# print 'condition is', dm.condition
# print 'content is', dm.content






