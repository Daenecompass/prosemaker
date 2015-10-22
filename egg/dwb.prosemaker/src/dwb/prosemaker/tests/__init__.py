
import unittest
from dwb.prosemaker import ProseMaker

# -------------------------------------------------------------------
class ProseMakerTestCase(unittest.TestCase):

    def setUp(self):
        self.pm = ProseMaker()

    def assertParses(self, source, expected, parser=None):
        if parser is None:
            parser = self.pm
        parser.source = source
        self.assertEqual(
            parser.doc,
            expected,
            "'%s' gave '%s'; expected '%s'" % (source, parser.doc, expected)
        )
