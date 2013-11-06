import unittest
from dwb.prosemaker import DocPart

class TestDocPart(unittest.TestCase):

    def setUp(self):
        self.dp = DocPart()

    def tearDown(self):
        pass

    ## content ##
    def test_content_starts_blank(self):
        self.assertEqual(self.dp.content, '')

    def test_content_can_be_set(self):
        self.dp.content = 'test content'
        self.assertEqual(self.dp.content, 'test content')

    ## condition ##
    def test_condition_starts_as_always(self):
        self.assertEqual(self.dp.condition, 'always')

    def test_condition_can_be_set(self):
        self.dp.condition = 'test condition'
        self.assertEqual(self.dp.condition, 'test condition')

    ## init ##
    def test_init_can_take_a_raw_block_on_init(self):
        test_condition = 'a condition'
        test_content   = 'some content'
        test_block     = ( '[[' + test_condition + ']]' + test_content )

        dp = DocPart(test_block)
        self.assertEqual(dp.condition, test_condition)
        self.assertEqual(dp.content, test_content)

    ## parse ##
    def test_parse_can_parse_a_no_condition_block(self):
        test_block = 'test block'
        self.dp.parse(test_block)
        self.assertEqual(self.dp.content, test_block)

    def test_parse_gives_condition_always_to_a_no_confition_block(self):
        test_block = 'test block'
        self.dp.parse(test_block)
        self.assertEqual(self.dp.condition, 'always')

    def test_parse_can_parse_a_conditional_block_with_leading_brackets(self):
        test_condition = 'a condition'
        test_content = 'some content'
        test_block = '[[' + test_condition + ']]' + test_content
        self.dp.parse(test_block)

        self.assertEqual(dp.condition, test_condition)
        self.assertEqual(dp.content, test_content)

    def test_parse_can_parse_a_conditional_block_without_leading_brackets(self):
        test_condition = 'a condition'
        test_content = 'some content'
        test_block = test_condition + ']]' + test_content
        self.dp.parse(test_block)

        self.assertEqual(dp.condition, test_condition)
        self.assertEqual(dp.content, test_content)
