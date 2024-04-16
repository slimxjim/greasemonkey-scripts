// ==UserScript==
// @name         Otevření odkazu "&gt;&gt;" klávesou šipka vpravo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Otevře odkaz s textem "&gt;&gt;" pomocí klávesy šipka vpravo.
// @author       You
// @match        https://www.rouming.cz/roumingGIF.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Najdeme všechny odkazy na stránce
    let links = document.querySelectorAll('a');

    // Projdeme každý odkaz
    links.forEach(
      function(link) {
        // Pokud odkaz obsahuje text "&gt;&gt;"
        if (link.textContent.includes('&gt;&gt;') || link.textContent.includes('>>')) {
            console.log('Našel jsem:', link);
            link.classList.add('next-gif');
            console.log(link);
        }
        if (link.textContent.includes('&lt;&lt;') || link.textContent.includes('<<')) {
            console.log('Našel jsem:', link);
            link.classList.add('prev-gif');
            console.log(link);
        }
    });

    document.onkeydown = checkKey;

    function checkKey(e) {

        let nextGifLink = document.querySelector('.next-gif');
        let prevGifLink = document.querySelector('.prev-gif');
        // Najdeme video element
        let video = document.getElementById('video');

        e = e || window.event;

        if (e.keyCode == '38') {
            // up arrow
            console.log('^^');
            if (nextGifLink) {
                console.log(nextGifLink.href);
                // Přidá zvuk o 10%
                video.volume = video.volume + 0.1;
            }
        }
        else if (e.keyCode == '40') {
            // down arrow
            console.log('ˇˇ');
            if (nextGifLink) {
                console.log(nextGifLink.href);
                // Vypneme zvuk
                video.volume = 0;
            }
        }
        else if (e.keyCode == '37') {
            // left arrow
            console.log('<<');
            if (prevGifLink) {
                console.log(prevGifLink.href);

                window.location.href = prevGifLink.href;
            }
            else {
                console.log('Jsem na začátku.');
                window.location.href = 'https://www.rouming.cz/';
            }
        }
        else if (e.keyCode == '39') {
            // right arrow
            console.log('>>');
            if (nextGifLink) {
                console.log(nextGifLink.href);

                window.location.href = nextGifLink.href;
            }
        }

    }

})();
