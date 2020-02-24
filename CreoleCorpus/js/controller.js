var App = App || {};
App.controller = function () {

    "use strict";
    var that = {},
    searchForm,
    transcriptController;

    function init(transcriptHandler) {
      transcriptController = transcriptHandler;
      searchForm = document.getElementById('searchform');
      handleUserSearches();
    }

//listen to User Searchform input
    function handleUserSearches(){
      searchForm.addEventListener('click', function(e) {
          cancelPreviousUserSearch();
      });
      var searchTerm;
      var searchButton = document.getElementById("searchbutton");
      searchButton.addEventListener('click', function(e) {
          cancelPreviousUserSearch();
          searchTerm = searchForm.value;
          handleSearchRequest(searchTerm);
          searchForm.value = "";
        });
      window.onkeyup = function(e) {
          if(e.keyCode == 13 && searchForm.value != ""){
            searchTerm = searchForm.value;
            handleSearchRequest(searchTerm);
            searchForm.value = "";
          }
        }
      }
    //process UserInput into Searchform
    function handleSearchRequest(query){
      transcriptController.processSearchQuery(query);
    }
    //will set all backgroundColor in the transcript back to grey;
    function cancelPreviousUserSearch(){
      transcriptController.cancelUserSearch();
    }
    //display the Information for the current queried word
    function updateWordMetaInformation(french, commentary){
      console.log(french + "    " + commentary);
      var wordInformation = document.getElementById("wordMetaInformation");
      wordInformation.firstElementChild.innerHTML ="Commentary:   " + commentary + "</br>" + "French:   " + french ;
    }
    that.updateWordMetaInformation = updateWordMetaInformation;
    that.init = init;
    return that;
};
