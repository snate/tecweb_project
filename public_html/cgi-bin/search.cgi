#!/usr/bin/perl -w

$buffer = $ENV{'QUERY_STRING'};
my %input;
my $url;
my $page;
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
use CGI;
use CGI ":all";
use CGI::Carp qw(fatalsToBrowser);
$page = new CGI;
#die "Fatal errors are now sent to browser";
print $page->header(-charset=>'UTF-8'),
      $page->start_html(
          -head => [
            Link({-rel=>'shortcut icon',
              -href=>'images/logo-icon.png'}),
            Link({-rel=>'stylesheet',
              -href=>'http://fonts.googleapis.com/css?family=Open+Sans+Condensed:700,300'}),
            Link({-rel=>'stylesheet',
              -href=>'http://fonts.googleapis.com/css?family=Open+Sans+Condensed:700,300'}),
            Link({-rel=>'stylesheet',
              -href=>'../css/layout.css', -media=>'all'}),
            Link({-rel=>'stylesheet',
              -href=>'../css/mlayout.css', -media=>'handheld, screen and (max-width:480px), only screen and (max-device-width:480px)'}),
          ],
          -title => 'Pagina non trovata - What To Visit',
          -dtd=>[ '-//W3C//DTD XHTML 1.0 Strict//EN',
            'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'],
          -lang => 'it',
          -meta => {
            'keywords' => 'search,not,found,page,what,to,visit',
            'description' => 'Nessun risultato trovato con la ricerca',
            'author' => 'Graziano Grespan, Carlo Munarini, Federica Speggiorin, Sebastiano Valle',
            'title' => 'Pagina non trovata - What To Visit',
            'robots' => 'no index',
            'reply-to' => 'teamtecweb@gmail.com',
            'Classification' => 'Tourism'
          },
          -author => 'teamtecweb@gmail.com'
      ),
      $page->div({-id=>'header'},
        h1(
          a({-href=>'homepage.xhtml',-title=>'Pagina principale'},
            "WHAT TO VISIT",
          )
        ),
      ), "\n",
      $page->div({-id=>'breadcrumb'},
        ul({-id=>'navmenu'},
          li(
            a({-href=>'homepage.xhtml',-title=>'Pagina principale'},
              span({lang=>'en'},
                "Home"
              ),
            ),
            " &gt; Ricerca"
          )
        ),
        start_form(
              -method=>'get',
              -action=>'search.cgi',),
          fieldset({-id=>'search'},
            label({-for=>'place'},
              "Cerca"
            ),
            input({-name=>'place',-id=>'place',type=>'text',-tabindex=>'1'})
          ),
        end_form(),
        ), "\n",
      $page->div({-id=>'nav'},
        ul(
          li(
            a({-href=>'homepage.xhtml',-title=>'Pagina principale'},
              span({-lang=>'en'},
                "Home"
              ),
            ),
            ul(
              li(
                a({-href=>'mare.xhtml',-title=>'Pagina delle località marittime'},
                  "Mare"
                ),
              ),
              li(
                a({-href=>'mare.xhtml',-title=>'Pagina delle località cittadine'},
                  "Citt&#224;"
                ),
              ),
              li(
                a({-href=>'montagna.xhtml',-title=>'Pagina delle località montane'},
                  "Montagna"
                ),
              ),
            ),
          ),
        ),
      ), "\n",
      $page->div({-id=>'content'},
        h1(
          "Nessun risultato trovato",
        ),
        p(
          "Siamo spiacenti, prova a riformulare la tua ricerca o torna alla homepage",
        ),
      ), "\n",
      $page->div({-id=>'footer'},
        div({-id=>'xhtml_valid'},
          a({-href=>'http://validator.w3.org/check?uri=referer'},
            img(
              {-src=>'http://www.w3.org/Icons/valid-xhtml10',
               -alt=>'Valid XHTML 1.0 Strict',}
            )
          ),
        ),
      ), "\n",
      $page->end_html, "\n";
