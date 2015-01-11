window.onload = init;

function init(){
    search();
  };
  var searchbar = document.getElementById('place');

function search(){
  var searchbar = document.getElementById('place');
  searchbar.value = "Nome località";
  searchbar.holder = true;
  searchbar.oldClass = searchbar.className;   //salvo vecchia classe (estensibilità)
  searchbar.className += " emphasized";
  searchbar.onfocus = searchFocus;            //assegno cosa fare onfocus
  searchbar.onblur = searchBlur;
};

function searchFocus(){
  var searchbar = document.getElementById('place');
  if(searchbar.holder) {
    searchbar.value = "";
    searchbar.className = searchbar.oldClass;
  }
};

function searchBlur(){
  var searchbar = document.getElementById('place');
  if(searchbar.value == "") {
    searchbar.value = "Nome località";
    searchbar.className += " emphasized";
    searchbar.holder = true;
  } else
    searchbar.holder = false;
};
