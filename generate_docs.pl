#!/usr/bin/perl
use strict;
#use warnings;
#use warnings FATAL => 'all';
system('rm -rf comment');

if ($ARGV[0] eq '--simple' || $ARGV[0] eq '-s'){
  print("生成基本模板\n");
  system('jsdoc -c jsdoc.config.json --destination ./comment -R README.md -r .');
} else {
  system('jsdoc -c jsdoc.config.json --destination ./comment -t ./node_modules/ink-docstrap/template -R README.md -r .');
}

