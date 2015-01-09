#!/usr/bin/perl -w

$buffer = $ENV{'QUERY_STRING'};
local(%input);
local($url);
@pairs = split(/&/, $buffer);
foreach $pair (@pairs) {
  ($name, $value) = split(/=/, $pair);
  $value =~ tr/+/ /;
  $value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/g;
  $value = lc $value;
  $name =~ tr/+/ /;
  $name =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C",hex($1))/g;
  $input{$name} = $value;
}

local($place) = $input{"place"};
if($place eq "paris" || $place eq "parigi") {
  $url = "../paris.xhtml";
  print "Location: $url\n\n";
}
if($place eq "london" || $place eq "londra") {
  $url = "../london.xhtml";
  print "Location: $url\n\n";
}
if($place eq "zakynthos" || $place eq "zante") {
  $url = "../zakynthos.xhtml";
  print "Location: $url\n\n";
}
if($place eq "madonna di campiglio" || $place eq "madonnadicampiglio" ||
    $place eq "madonna") {
  $url = "../madonnadicampiglio.xhtml";
  print "Location: $url\n\n";
}
if($place eq "prague" || $place eq "praga") {
  $url = "../praga.xhtml";
  print "Location: $url\n\n";
}
$url = "../homepage.xhtml";
print "Location: $url\n\n";
