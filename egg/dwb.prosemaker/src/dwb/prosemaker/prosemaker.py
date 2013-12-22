class ProseMaker:

    def __init__(self):
        self._data   = {}
        self._source = ''

    ## data
    @property
    def data(self):
        """ The 'data' property """
        return self._data

    @data.setter
    def data(self, value):
        self._data = value
        return self._data

    @data.deleter
    def data(self):
        del self._data

    ## source
    @property
    def source(self):
        """ The 'source' property """
        return self._source

    @source.setter
    def source(self, value):
        self._source = value
        return self._source

    @source.deleter
    def source(self):
        del self._source

    ## doc
    @property
    def doc(self):
        """ The 'doc' property """
        raise NotImplementedError("TODO - doc is not yet implemented")
