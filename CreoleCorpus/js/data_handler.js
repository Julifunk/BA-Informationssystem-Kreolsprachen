var App = App || {};
App.data_handler = function () {

    "use strict";
    var that = {},
    filepathxml = "src/xml/transcript_tei.xml",
    metaInf = "",
    metaData,
    scriptHandler,
    uiContr,
    audio,
    statistics,
    doc;


    function init(transcriptHandler, uiController, player, metaInformation, stats){
      metaData = metaInformation;
      scriptHandler = transcriptHandler;
      uiContr = uiController;
      audio = player;
      statistics = stats;
      readXMLData();
    }

    function readXMLData(){
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          retrieveXMLDoc(this);
        }
      };
      request.open("GET", filepathxml, true);
      request.send();
    }



    function retrieveXMLDoc(doc){
      var xmlDoc = doc.responseXML;
      getMetaInformation(xmlDoc);
      audio.init(xmlDoc, scriptHandler, uiContr);
      statistics.init(xmlDoc);
    }
    //will read Metainformation on the audio from the xml-file
    function getMetaInformation(doc){
      var element = doc.getElementsByTagName('settingDesc')[0].childNodes;
      for(var i = 0; i<element.length; i++){
        if(element[i].innerHTML != undefined){
          if(element[i].hasAttribute('style')){
            metaInf += "<b>" + element[i].innerHTML + "</b></br>";
          }
          else{
            metaInf += element[i].innerHTML + "</br>";
          }
          metaData.setInformation(metaInf);
        }
      }
    }

    that.init = init;
    that.readXMLData = readXMLData;
    return that;
};
