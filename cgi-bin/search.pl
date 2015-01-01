#!/usr/bin/perl -w
local(%input);
read(STDIN,$buffer,$ENV{'CONTENT_LENGTH'});
my $url = "../public_html/homepage.xhtml";
print "Location: $url\n\n";
