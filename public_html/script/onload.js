window.onload = init;

function init(){
  search();
};

function search(){
  var searchbar = document.getElementById('place');
  searchbar.value = "Nome località";
  searchbar.firstTime = "true";
  searchbar.onfocus = focusSearch;
};

function focusSearch(){
  var searchbar = document.getElementById('place');
  if(searchbar.firstTime) {
    searchbar.firstTime = false;
    searchbar.value = "";
  }
};
