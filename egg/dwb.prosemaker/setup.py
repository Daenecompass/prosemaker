from setuptools import setup, find_packages
import os

version = '0.1'

long_description = (
    open('README.txt').read()
    + '\n' +
    'Contributors\n'
    '============\n'
    + '\n' +
    open('CONTRIBUTORS.txt').read()
    + '\n' +
    open('CHANGES.txt').read()
    + '\n'
)

setup(
    name='dwb.prosemaker',
    version=version,
    description="Document assembly with numeric conditions for scientific reporting.",
    long_description=long_description,
    # Get more strings from
    # http://pypi.python.org/pypi?%3Aaction=list_classifiers
    classifiers=[
        "Programming Language :: Python",
        "Intended Audience :: Science/Research"
    ],
    keywords='',
    author='Daniel Baird',
    author_email='daniel@danielbaird.com',
    url='https://github.com/DanielBaird/prosemaker',
    license='Apache',
    packages=find_packages('src'),
    package_dir = {'': 'src'},
    namespace_packages=['dwb'],
    include_package_data=True,
    zip_safe=True,
    install_requires=[
        'setuptools',
        # -*- Extra requirements: -*-
    ],
    entry_points="""
    # -*- Entry points: -*-
    """,
)
