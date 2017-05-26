#!/usr/bin/perl
use strict;
use warnings FATAL => 'all';
system('rm -rf comment');
#system('jsdoc src/* -c jsdoc.config.json -t ./node_modules/ink-docstrap/template -R README.md -r .');
#system('jsdoc src/* -r -c jsdoc.config.json');

system('jsdoc -c jsdoc.config.json --destination ./comment -t ./node_modules/ink-docstrap/template -R README.md -r .');
