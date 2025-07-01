// ==UserScript==
// @name         iDnes: Zastavit autoplay videa
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Zabrání automatickému spuštění videa
// @match        https://*.idnes.cz/*
// @grant        none
// @icon         https://1gr.cz/u/favicon/idnes.ico
// ==/UserScript==

(function() {
    'use strict';

    const stopAutoplay = () => {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            // Vypni autoplay, pokud by ho někdo přidal skriptem
            video.autoplay = false;
            video.preload = "none";

            // Zastav přehrávání
            video.pause();

            // V případě, že se spustí později skriptem
            video.addEventListener('play', () => {
                video.pause();
            }, { once: true });
        });
    };

    // Spusť hned
    stopAutoplay();

    // A znovu po načtení případných dalších videí
    new MutationObserver(() => {
        stopAutoplay();
    }).observe(document.body, { childList: true, subtree: true });
})();