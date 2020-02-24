var App = App || {};
App.metadata = function () {

    "use strict";
    var that = {},
    uiController,
    filepath;
    function init(){
    }

    function setInformation(metaData) {
      var metaInfo = document.getElementById("textMetaInformation");
      metaInfo.innerHTML = metaData;
    }
    that.init = init;
    that.setInformation = setInformation;
    return that;
};
