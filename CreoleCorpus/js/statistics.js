var App = App || {};
App.statistics = function () {

    "use strict";
    var that = {},
        filepath = "src/transcripts/normalized.txt",
        normalizedText,
        xmlDoc,
        frequencyAnalysisCompleteTextPicker,
        frequencyAnalysisBySpeakerTextPicker,
        frequencyAnalysisButton,
        frequencyAnalysisResultSpace,
        collocationQueryBox,
        collocationResultButton,
        collocationResultSpace,
        frequencyCompleteSelected,
        frequencyBySpeakerSelected,
        txtArray=[]
        ;



    function init(doc){
      xmlDoc = doc;
      frequencyAnalysisButton = document.getElementById("go_freqency");
      frequencyAnalysisResultSpace = document.getElementById("resultlist_frequency");
      frequencyAnalysisResultSpace.style.display="none";
      collocationQueryBox = document.getElementById("collocation_query");
      collocationResultButton = document.getElementById("go_collocation");
      collocationResultSpace = document.getElementById("resultlist_collocations");
      collocationResultSpace.style.display="none";
      readTXTData();
      handleUserInput();
    }
    //will listen for clicks on the "calculate"-buttons
    function handleUserInput(){
      frequencyAnalysisButton.addEventListener("click", calculateWordFrequency);
      collocationResultButton.addEventListener("click", calculateCollocationsForWord);

    }
    //will calculate word frequency by forming hash of the words of the text, consolidating them in an array, sort the array
    function calculateWordFrequency(){
      var frequencies = {};
      txtArray.forEach(function (word) {
        if (frequencies.hasOwnProperty(word)) {
          frequencies[word]++;
        } else {
          frequencies[word] = 1;
        }
      });
      sortFrequencies(frequencies);
    }

    //will sort the word frequencies big to little
    function sortFrequencies(frequencies){
      var resultList = "<ul>";
      var unSortedArray =[];
      for(var key in frequencies){
        unSortedArray.push([key, frequencies[key]]);
      }
      var sortedArray = unSortedArray.sort(function(count1, count2) {
        return count2[1] - count1[1];
      });
      for(var i=0; i<sortedArray.length; i++){
        var percentage = sortedArray[i][1]/txtArray.length*100;
        console.log(sortedArray[i][0] + "  " + sortedArray[i][1]);
        resultList += "<li>" + " <b>mot:</b> " + sortedArray[i][0] + "  <b>nombre:</b> " + sortedArray[i][1] + "   <b>pourcent:</b> " + percentage + "%    </li>";
      }
      frequencyAnalysisResultSpace.style.display="block";
      frequencyAnalysisResultSpace.innerHTML = resultList + "</ul>";
    }

    //will listen for user input into query-form
    function calculateCollocationsForWord (){
      collocationQueryBox.addEventListener('click', function(e) {
          collocationQueryBox.value = "";
      });
      var searchTerm;
      searchTerm = collocationQueryBox.value;
      handleCollocationSearchRequest(searchTerm);

    }

    //will calculate and display the collocations of that word
    function handleCollocationSearchRequest(term){
      var resultList = "";
      if(term != ""){
        for(var i=0; i<txtArray.length; i++){
          if(term == txtArray[i]){
            if(i>=2 && i<=txtArray.length-2){
              resultList += "<div>" + txtArray[i-2] + " " + txtArray[i-1] + " " + "<span style='backgroundColor: #d1d1d1'>" + txtArray[i] +"</span>" + " " +  txtArray[i+1] + " " + txtArray[i+2] + "</div>"
            }
            else if(i>=2 && i==txtArray.length-1){
              resultList += "<div>" + txtArray[i-2] + " " + txtArray[i-1] + " " + "<span style='backgroundColor: #d1d1d1'>" + txtArray[i] +"</span>" + " " +  txtArray[i+1] + "</div>";
            }
            else if(i==1 && i<=txtArray.length-2){
              resultList += "<div>" + txtArray[i-1] + " " + "<span style='backgroundColor: #d1d1d1'>" + txtArray[i] +"</span>" + " " +  txtArray[i+1] +  " " + txtArray[i+2] +"</div>";
            }
            else {
              resultList += "<div><span style='backgroundColor: #d1d1d1'>" + txtArray[i] +"</span></div>";
            }
          }
        }
        collocationResultSpace.style.display="block";
        if(resultList != ""){
          collocationResultSpace.innerHTML = resultList;
        }
        else{
          collocationResultSpace.innerHTML = "Le mot de recherche n'a pas retrouvé des collocations";
        }

      }
      else{
        collocationResultSpace.innerHTML = "Vous n'avez pas metté une mot de recherche";
      }
    }
    //will read the normalized transcript into an array of words
    function readTXTData(){
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          retrieveTXTDoc(this);
        }
      };
      request.open("GET", filepath, true);
      request.send();
    }

    function retrieveTXTDoc(txt){
      var text = txt.responseText;
      txtArray = text.split(/\s+/);
    }

    that.init = init;
    return that;
};
