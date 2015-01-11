window.onload = init;

function init(){
  search();
};

function search(){
  var searchbar = document.getElementById('place');
  searchbar.value = "Nome località";
  searchbar.firstTime = "true";
  searchbar.oldClass = searchbar.className;
  searchbar.className = "emphasized";
  searchbar.onfocus = focusSearch;
};

function focusSearch(){
  var searchbar = document.getElementById('place');
  if(searchbar.firstTime) {
    searchbar.firstTime = false;
    searchbar.value = "";
    searchbar.className = searchbar.oldClass;
  }
};
