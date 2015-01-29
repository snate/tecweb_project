#!/usr/bin/perl -w
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use XML::LibXML;

my %input;
my $url;
my $page = new CGI;
my $user = $page->param('user');
my $comment = $page->param('comment');

my $file = 'commenti.xml';
my $parser = XML::LibXML->new();
my $doc = $parser->parse_file($file);

my $root = $doc->getDocumentElement;

$doc->documentElement->setNamespace("http://www.commenti.com","c");

my $query = "//c:localita[\@nome='madonnadicampiglio']";

my $father = $doc->findnodes($query)->get_node(1);

my $fragment = "<comment user=\"" . $user . "\">
                <corpo>" . $comment . "</corpo>
                <pubblicationDate>2004-10-02</pubblicationDate>
               </comment>\n";

my $newnode = $parser->parse_balanced_chunk($fragment);
$father->appendChild($newnode);

open OUT,">$file" || die("error");
print OUT $doc->toString;
close OUT;

print "Content-type: text/html\n\n";
print $father->toString;
print "<p>OK</p>";
print $doc->toString;

exit;