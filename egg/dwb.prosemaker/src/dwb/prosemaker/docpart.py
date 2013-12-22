class DocPart:

    def __init__(self, block=None):
        self._content = ''
        self._condition = 'always'

        if block:
            self.parse(block)

    ## content
    @property
    def content(self):
        """ The 'content' property """
        return self._content

    ## condition
    @property
    def condition(self):
        """ The 'condition' property """
        return self._condition

    def parse(self, block):
        """ The 'parse' method """
        raise NotImplementedError("TODO - parse is not yet implemented")
