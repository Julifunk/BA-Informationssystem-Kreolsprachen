var App = App || {};
App.player = function () {

    "use strict";
    var that = {},
        player,
        timeMap = [],
        AUDIOPATH = "src/audio/enregistrement2_audio.WAV",
        doc,
        audioTranscript = "",
        transcriptMap = [],
        completeTranscript,
        currentTime;


    function init(xmlDoc, scriptHandler, uiContr) {
      completeTranscript = document.getElementById("text");
      audioTranscript = document.getElementById("transcript-space");
      doc = xmlDoc;
      initPlayer();
      getTranscript();
      setTranscript();
    }


    function initPlayer(){
          player = document.getElementById("player-element");
          player.innerHTML = player.innerHTML.replace("filepath", AUDIOPATH);
          player.addEventListener("timeupdate", handleAudioProcess);
    }

    //player should only play when transcript section is selected
    //timeupdates from player will be available in the whole module scope
    function handleAudioProcess(){
      if(document.getElementById('enregistrement').style.display == "none"){
        player.pause();
      }
      currentTime = player.currentTime;
      highlightCurrentText(currentTime);
    }
    //will set the complete transcript
    function setTranscript(){
      var textString="";
      for(var i=0; i<transcriptMap.length; i++){
        textString = textString + "<div style='cursor: pointer'>" + transcriptMap[i].text + "</div>"
      }
      completeTranscript.innerHTML = textString;
      makeTranscriptClickable();
    }
    //will select the speakers' sections from the xmlDoc
    function getTranscript(){
      var completeSpeakerTranscript = "";
      var transcript = doc.getElementsByTagName('body')[0].childNodes[1].childNodes;
      for(var i = 0; i<transcript.length; i++){
          for(var j=0; j<transcript[i].childNodes.length; j++){
            if(transcript[i].childNodes[j].innerHTML != undefined){
              var element = transcript[i].childNodes[j];
              if(element.hasAttribute('who')){
                var elementObject = {text:element.innerHTML, start:element.getAttribute('start')/1.3, end:element.getAttribute('end')/1.3, completeElement:element.parentElement};
                transcriptMap.push(elementObject);
              }
            }
          }
        }
    }
    //will listen to clicks on sections of the transcript
    function makeTranscriptClickable(){
      var completeTranscript = document.getElementById("text");
      completeTranscript.addEventListener("click", function(e){
          var clickedLine = e.target;
          clickedLine.style.color = "#7D003C";
          for(var i=0; i<transcriptMap.length; i++){
            if(transcriptMap[i].text == clickedLine.innerHTML){
              player.currentTime = transcriptMap[i].start;
            }
          }
      setTimeout(function turnClickyBlack(){
      clickedLine.style.color="black";}, 300);
      })
    }

    function highlightCurrentText(currentTime){
      var currentText = "";
      for(var i=0; i<transcriptMap.length; i++){
        if(currentTime >= transcriptMap[i].start && currentTime <= transcriptMap[i].end){
          completeTranscript.childNodes[i].style.backgroundColor = "#ffffff";
          displayCurrentPhrase(currentTime, transcriptMap[i]);
        }
        else{
          completeTranscript.childNodes[i].style.backgroundColor = "#d1d1d1";
        }
      }
    }
    //will display the currently spoken phrase in the audio-player section
    function displayCurrentPhrase(time, phrase){
      var displayText = "";
      var itemsList = phrase.completeElement.childNodes[3];
      var phraseItems = itemsList.getElementsByTagName("item");
      for(var i=0; i<phraseItems.length; i++){
        var word = phraseItems[i].getElementsByTagName('u')[0].innerHTML;
        displayText += "<span style='cursor: pointer'>" + word + " " + "</span>"
        var start = phraseItems[i].getElementsByTagName('u')[0].getAttribute('start');
        var end = phraseItems[i].getElementsByTagName('u')[0].getAttribute('end');
      }
      audioTranscript.innerHTML = displayText;
      handleAudioTranscriptClicks(phrase);
    }
      //will listen for clicks on single words of the transcript
      function handleAudioTranscriptClicks(phrase){
        audioTranscript.addEventListener("click", function(e){
            var clickedWord = e.target;
            clickedWord.style.color = "#7D003C";
            displayWordInformation(e.target.innerHTML, phrase);

        setTimeout(function turnClickyBlack(){
        clickedWord.style.color="black";}, 300);
        })
      }
      //will onClick on single word in transcript display information for that word in the right section of the page
      function displayWordInformation(target, phrase){
        var wordMetaInformation;
        var itemsList = phrase.completeElement.childNodes[3];
        var phraseItems = itemsList.getElementsByTagName("item");
        for(var i=0; i<phraseItems.length; i++){
          var word = phraseItems[i].getElementsByTagName('u')[0].innerHTML + " ";
          if(word === target){
            var  gloss = phraseItems[i].getElementsByTagName('gloss');
            gloss = gloss[0].innerHTML;
            var french = phraseItems[i].getElementsByTagName('term');
            french = french[0].innerHTML;
            wordMetaInformation = "Gloss: " + gloss + "</br>" + "Francais: " + french;
          }
        }
        setWordMetaInformation(wordMetaInformation);
      }

      function setWordMetaInformation(metaInf){
        var wordInformation = document.getElementById("wordMetaInformation");
        wordInformation.innerHTML = metaInf;
      }




    that.init = init;
    return that;
};
