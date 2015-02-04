#!/usr/bin/perl -w
use CGI;
use CGI ":all";
use CGI::Carp qw(fatalsToBrowser);
my $url;
my $page = new CGI;

my $place = lc $page->param('place');
if($place eq "paris" || $place eq "parigi") {
  $url = "../paris.html";
  print "Location: $url\n\n";
}
if($place eq "london" || $place eq "londra") {
  $url = "../london.html";
  print "Location: $url\n\n";
}
if($place eq "zakynthos" || $place eq "zante") {
  $url = "../zakynthos.html";
  print "Location: $url\n\n";
}
if($place eq "madonna di campiglio" || $place eq "madonnadicampiglio" ||
    $place eq "madonna") {
  $url = "../madonnadicampiglio.html";
  print "Location: $url\n\n";
}
if($place eq "prague" || $place eq "praga") {
  $url = "../praga.html";
  print "Location: $url\n\n";
}

print $page->header(-charset=>'UTF-8'),
      $page->start_html(
          -head => [
            Link({-rel=>'shortcut icon',
              -href=>'../images/logo-icon.png'}),
            Link({-rel=>'stylesheet',
              -href=>'http://fonts.googleapis.com/css?family=Roboto:700,400|Open+Sans+Condensed:300'}),
            Link({-rel=>'stylesheet',
              -href=>'../css/layout.css', -media=>'all'}),
            Link({-rel=>'stylesheet',
              -href=>'../css/mlayout.css', -media=>'handheld, screen and (max-width:480px), only screen and (max-device-width:480px)'}),
          ],
          -script => [
            {-type=>'text/javascript', -src=>"../scripts/main.js"},
            {-type=>'text/javascript', -src=>"../scripts/require.js"},
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
            'Classification' => 'Tourism',
            'viewport' => 'width=device-width,initial-scale=1'
          },
          -author => 'teamtecweb@gmail.com'
      ),
      $page->div({-id=>'header'},
        h1(
          a({-href=>'../homepage.html',-title=>'Pagina principale'},
            "WHAT TO VISIT",
          )
        ),
      ), "\n",
      $page->div({-id=>'breadcrumb'},
        "Ti trovi in: ",
          a({-href=>'../homepage.html',-title=>'Pagina principale'},
              span({lang=>'en'},
                "Home"
              ),
            ),
            " &gt; Ricerca",
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
            a({-href=>'../homepage.html',-title=>'Pagina principale'},
              span({-lang=>'en'},
                "Home"
              ),
            ),
            ul(
              li(
                a({-href=>'../mare.html',-title=>'Pagina delle località marittime'},
                  "Mare"
                ),
              ),
              li(
                a({-href=>'../citta.html',-title=>'Pagina delle località cittadine'},
                  "Citt&#224;"
                ),
              ),
              li(
                a({-href=>'../montagna.html',-title=>'Pagina delle località montane'},
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
          "Siamo spiacenti, prova a riformulare la tua ricerca o torna alla",
          a({-href=>'../homepage.html',-title=>'Pagina principale'},
            span({-lang=>'en'},
              "homepage"
            ),
          ),".",
        ),
      ), "\n",
      $page->div({-id=>'footer',-class=>'foothome'},
        ul(
          li(
            a({-href=>'../chisiamo.html',-title=>'Informazioni sul sito'},
              "Chi siamo",
            )
          ),
          li(
            a({-href=>'../faq.html',-title=>'FAQ'},
              span({-lang=>'en'},
                abbr({-title=>'Frequently Asked Questions'},
                  "F.A.Q."
                )
              )
            )
          ),
          li(
            a({-href=>'../privacy.html',-title=>'Informazioni sulla privacy'},
              "Normativa sulla",
              span({-lang=>'en'},
                "privacy"
                )
            )
          ),
          li(
            a({-href=>'../mappa.html',-title=>'Mappa del sito'},
              "Mappa del sito",
            )
          ),
        ),
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
