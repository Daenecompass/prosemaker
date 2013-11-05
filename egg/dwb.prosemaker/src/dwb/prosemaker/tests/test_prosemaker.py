import unittest
from dwb.prosemaker import ProseMaker

class TestProseMaker(unittest.TestCase):

    def setUp(self):
        self.prosemaker = ProseMaker()
        pass

    def tearDown(self):
        pass

    ## data ##
    def test_data_starts_empty(self):
        self.assertEqual(self.prosemaker.data, {})

    def test_data_can_be_set(self):
        test_data = {
            'a': 1,
            'b': 5,
        }
        self.prosemaker.data = test_data
        self.assertEqual(self.prosemaker.data, test_data)

    def test_data_must_be_dict_like(self):
        test_data = 1

        with self.assertRaises(TypeError):
            self.prosemaker.data = test_data

    def test_data_starts_blank(self):
        self.assertEqual(self.prosemaker.data, {})

    ## source ##
    def test_source_starts_blank(self):
        self.assertEqual(self.prosemaker.source, '')

    def test_source_can_be_set(self):
        test_source = 'source document'
        self.prosemaker.source = test_source
        self.assertEqual(self.prosemaker.source, test_source)

    # This test assumes you'll check the source via
    # isinstance. example:
    #
    #   isinstance('aa', str)
    #   >> False
    #
    #   isinstance(1, str)
    #   >> True
    #
    def test_source_must_be_string_like(self):
        with self.assertRaises(TypeError):
            self.prosemaker.source = 1

        with self.assertRaises(TypeError):
            self.prosemaker.source = []

        with self.assertRaises(TypeError):
            self.prosemaker.source = {}
