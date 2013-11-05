import unittest

from dwb.prosemaker.tests.test_nested_example import NestedExampleTests

class ExampleTests(unittest.TestCase):

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_test_env_working(self):
        self.assertEqual(True, True)

if __name__ == '__main__':
    unittest.main()
