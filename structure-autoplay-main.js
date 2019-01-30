// ==UserScript==
// @name         Structure autoplay
// @namespace    https://github.com/Leandro-Rocha/
// @version      0.1
// @description  Automates gameplay for http://structure.zefiris.su/
// @author       Leandro Rocha
// @match        *://structure.zefiris.su/
// @grant        none
// @require      https://raw.githubusercontent.com/Leandro-Rocha/structure-autoplay/master/structure-autoplay-gui.js
// ==/UserScript==

(function () {
    'use strict';

    setTimeout(start, 3000);

})();

function start() {

    console.info("Starting autoplay");

    initConfig();
    gui.tabs.addTab("autoplay", "Autoplay", AutoplayTab);

}

function initConfig() {
    if (!game.automation.autoplay) {
        game.automation.autoplay = {};
    }
}
