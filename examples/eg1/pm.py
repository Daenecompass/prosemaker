#
# command line ProseMaker tool
#

import argparse
import sys
import os
import json
from decimal import Decimal

sys.path.append('../../prosemaker')
from dwb.prosemaker import ProseMaker

# ---------------------------------------------------------

def complain(problem, argParser):
	"""complain and then die"""
	print("A problem occurred:")
	print(problem, '\n')
	argParser.print_usage()
	print()
	sys.exit(1)


def file_there(fname):
	"""is there a readable file there?"""
	if os.path.isfile(fname) and os.access(fname, os.R_OK):
		return True
	else:
		return False


def file_writable(fname):
	"""can we write to a file at this path?"""
	if os.path.exists(fname):
		if os.path.isfile(fname):
			return os.access(fname, os.W_OK)
		else:
			return False # path is a dir, unwritable

	# target does not exist, check perms on parent dir
	parent = os.path.dirname(fname)
	if not parent:
		parent = '.'
	return os.access(parent, os.W_OK)


# ---------------------------------------------------------

# read the supplied arguments
argParser = argparse.ArgumentParser(description='pm : use ProseMaker at the command line')

argParser.add_argument('data',     metavar="dataFile", type=str, help='JSON format data file')
argParser.add_argument('template', metavar="templateFile", type=str, help='text template file')
argParser.add_argument('result',   metavar="resultFile", type=str, help='name for output')

args = argParser.parse_args()

if not file_there(args.data):
	complain("Data file isn't accessible", argParser)

if not file_there(args.template):
	complain("Template file isn't accessible", argParser)

if not file_writable(args.result):
	complain("Result file isn't writable", parser)

# by now the files we need are probably accessible in the right way.

# read in the json data
json_string = ''
json_data = {}
with open(args.data) as jsonfile:
	# start with the normal content
	json_string = jsonfile.read()

# read in the template
template_string = ''
with open(args.template) as template:
	# start with the normal content
	template_string = template.read()

# turn the json into a python dict
json_data = json.loads(
	json_string,
	parse_float=Decimal, parse_int=Decimal, parse_constant=Decimal
)

# get a prosemaker and give it the data and template
pm = ProseMaker()
pm.data = json_data
pm.source = template_string

# print the output
with open(args.result, "w") as resultfile:
	resultfile.write(pm.doc)
