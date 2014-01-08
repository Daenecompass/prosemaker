
from docpart import DocPart

class ProseMaker(object):

    def __init__(self):
        self._data   = {}
        self._source = ''

    ## data ---------------------------------------------------------
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

    ## source -------------------------------------------------------
    @property
    def source(self):
        """ The 'source' property """
        return self._source

    @source.setter
    def source(self, value):
        self._source = value

        raw_parts = self._source.split(r"[[") ###]]" ### stupid Sublime syntax highlighter
        self._parts = [DocPart(raw_part) for raw_part in raw_parts]

        return self._source

    @source.deleter
    def source(self):
        del self._source

    ## doc ----------------------------------------------------------
    @property
    def doc(self):
        """ The 'doc' property """

        resolved_parts = [self.resolve_document_part(part) for part in self._parts]

        return(''.join(resolved_parts))

    # ---------------------------------------------------------------
    def resolve_document_part(self, doc_part):
        if self.resolve_condition(doc_part.condition):
            return self.resolve_content(doc_part.content)
        else:
            return ''

    # ---------------------------------------------------------------
    def resolve_condition(self, condition):
        condition = str(condition)
        if condition == 'always':
            return True
        if condition == 'never':
            return False

        # here's where the fancy parsing happens
        #
        #

        raise Exception('condition not understood')

    # ---------------------------------------------------------------
    def resolve_content(self, content):

        content = str(content) # force it into a string form (probably it's already a string)

        if len(self.data) > 0:

            content = content + ' ' # add a trailing space so the split doesn't fail if the last thing is a var.

            sorted_varnames = self.data.keys()
            sorted_varnames.sort(key=len, reverse=True) # sort longest first

            replacements = 1

            while (replacements > 0):
                replacements = 0
                for varname in sorted_varnames:
                    if ('$$' + varname) in content:
                        content = content.replace('$$' + varname, str(self.data[varname]))
                        replacements += 1

            content = content[:-1] # remove the space we added at the start of this method

        return content














