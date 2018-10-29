
Example 1: a command line tool
==============================

This example creates a command line tool for running ProseMaker on a data file and template file, saving output into a result file.

Setup
-----

To try this example, change into the example directory

    cd examples/eg1

..and install the required libraries with:

    pip install -r requirements.txt


Running
-------

Run the example:

    python pm.py sampledata.json sampletemplate.md output.md

This will create `output.md` in the current directory.  Try changing the content of `sampledata.json` and `sampletemplate.md`. If you want to see the output, try something like:

    python pm.py sampledata.json sampletemplate.md output.md && cat output.md

