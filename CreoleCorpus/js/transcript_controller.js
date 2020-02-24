var App = App || {};
App.transcript_controller = function () {

    "use strict";
    var that = {};

    function init(){
    }

//will find occurences of the queried word in the complete transcript and set their background to white
    function processSearchQuery(query){
      var transcript = document.getElementById("text");
      for(var i=0; i<transcript.childNodes.length; i++){
        var strings = transcript.childNodes[i].innerHTML.split(" ");
        transcript.childNodes[i].style.backgroundColor="#d1d1d1";
        for(var j=0; j<strings.length; j++){
            if(strings[j] == query){
              transcript.childNodes[i].style.backgroundColor="#ffffff";
            }
        }
      }
    }

    function cancelUserSearch(){
      var transcript = document.getElementById("text");
      for(var i=0; i<transcript.childNodes.length; i++){
        transcript.childNodes[i].style.backgroundColor="#d1d1d1";
      }
    }

    that.cancelUserSearch = cancelUserSearch;
    that.processSearchQuery = processSearchQuery;
    that.init = init;
    return that;
};
