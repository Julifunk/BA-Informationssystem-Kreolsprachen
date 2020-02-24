var App = App || {};
App.TranscriptPlayer = (function () {

    "use strict";
    var that = {},
    player,
    uiController,
    metaInformation,
    transcriptHandler,
    dataHandler,
    stats;


    function init() {
        transcriptHandler = new App.transcript_controller();
        transcriptHandler.init();
        uiController = new App.controller();
        uiController.init(transcriptHandler);
        player = new App.player();
        stats = new App.statistics();
        metaInformation = new App.metadata();
        metaInformation.init();
        dataHandler = new App.data_handler();
        dataHandler.init(transcriptHandler, uiController, player, metaInformation, stats);
    }


    that.init = init;
    return that;
}());
