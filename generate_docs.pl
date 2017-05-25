#!/usr/bin/perl
use strict;
use warnings FATAL => 'all';
system('rm -rf out');
#system('jsdoc src/* -c jsdoc.config.json -t ./node_modules/ink-docstrap/template -R README.md -r .');
#system('jsdoc src/* -r -c jsdoc.config.json');

system('jsdoc -c jsdoc.config.json -t ./node_modules/ink-docstrap/template -R README.md -r .');
