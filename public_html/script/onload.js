
var searchbar = document.getElementById('place');

searchbar.value = "Nome località";
searchbar.className = "emphasized";

searchbar.onfocus = function(){
  searchbar.value = "";
  searchbar.className = "emphasized";
}
searchbar.onblur = function(){
  searchbar.value = "Nome località";
  searchbar.className = "emphasized";
};
