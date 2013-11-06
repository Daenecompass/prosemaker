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

    ## source ##
    def test_source_starts_blank(self):
        self.assertEqual(self.prosemaker.source, '')

    def test_source_can_be_set(self):
        test_source = 'source document'
        self.prosemaker.source = test_source
        self.assertEqual(self.prosemaker.source, test_source)

    ## doc inclusions ##
    def test_doc_includes_data_variables(self):
        self.prosemaker.data = {
            'a': 1,
            'b': 2,
            's': 'bam',
        }

        var_tests = {
            '$$a':                '1',
            '$$b':                '2',
            '$$c':                '$$c',
            '$$s':                'bam',
            '$$sbalam':           'bambalam',
            'a is $$a, b is $$b': 'a is 1, b is 2',
            '$$a$$s$$b$$a$$s':    '1bam21bam',
        }

        for test, result in var_tests.iteritems():
            self.prosemaker.source = test
            self.assertEqual(self.prosemaker.doc, result)

    def test_doc_includes_longer_varnames_first(self):
        self.prosemaker.data = { 's': 'bam', 'sss': 'foobar' }
        var_tests = {
            '$$s':          'bam',
            '$$sss':        'foobar',
            '$$s$$sss$$s':  'bamfoobarbam',
        }

        for test, result in var_tests.iteritems():
            self.prosemaker.source = test
            self.assertEqual(self.prosemaker.doc, result)

    def test_subs_varnames_inside_other_varnames(self):
        self.prosemaker.data = { 'a': 'bar', 'foobar': 'bam' }
        var_tests = {
            '$$foobar': 'bam',
            '$$foo$$a': 'bam',
        }

        for test, result in var_tests.iteritems():
            self.prosemaker.source = test
            self.assertEqual(self.prosemaker.doc, result)

    def test_doc_absolute_conditionals_includes_always_parts(self):
        var_tests = {
            '[[always]]asdf':                       'asdf',
            'qwer[[always]]asdf':                   'qwerasdf',
            'qwer[[always]]asdf[[always]]zxcv':     'qwerasdfzxcv',
        }

        for test, result in var_tests.iteritems():
            self.prosemaker.source = test
            self.assertEqual(self.prosemaker.doc, result)

    def test_doc_absolute_conditionals_omits_never_parts(self):
        var_tests = {
            '[[never]]asdf':                       '',
            'qwer[[never]]asdf':                   'qwer',
            'qwer[[never]]asdf[[always]]zxcv':     'qwerzxcv',
        }

        for test, result in var_tests.iteritems():
            self.prosemaker.source = test
            self.assertEqual(self.prosemaker.doc, result)

    def test_doc_variable_conditionals_compares_integers(self):
        self.prosemaker.data = { 'a': 1, 'b': 2, 'c': 10, 'z': 0 }

        var_tests = {
            '[[ a < 2 ]]pass':      'pass',
            'pass[[ a > 2 ]]fail':  'pass',
        }

        for test, result in var_tests.iteritems():
            self.prosemaker.source = test
            self.assertEqual(self.prosemaker.doc, result)
