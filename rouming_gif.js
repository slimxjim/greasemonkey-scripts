// ==UserScript==
// @name         Control GIFs with arrow key
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Opens link with text "&gt;&gt;" using the right arrow key.
// @author       You
// @match        https://www.rouming.cz/roumingGIF.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Find all links on the page
    let links = document.querySelectorAll('a');

    // Iterate through each link
    links.forEach(
      function(link) {
        // If the link contains the text "&gt;&gt;"
        if (link.textContent.includes('&gt;&gt;') || link.textContent.includes('>>')) {
            console.log('Found:', link);
            link.classList.add('next-gif');
            console.log(link);
        }
        if (link.textContent.includes('&lt;&lt;') || link.textContent.includes('<<')) {
            console.log('Found:', link);
            link.classList.add('prev-gif');
            console.log(link);
        }
    });

    document.onkeydown = checkKey;

    function checkKey(e) {

        let nextGifLink = document.querySelector('.next-gif');
        let prevGifLink = document.querySelector('.prev-gif');
        // Find the video element
        let video = document.getElementById('video');

        e = e || window.event;

        if (e.keyCode == '38') {
            // up arrow
            console.log('^^');
            if (nextGifLink) {
                console.log(nextGifLink.href);
                // Increase volume by 10%
                video.volume = video.volume + 0.1;
            }
        }
        else if (e.keyCode == '40') {
            // down arrow
            console.log('ˇˇ');
            if (nextGifLink) {
                console.log(nextGifLink.href);
                // Mute the volume
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
                console.log('I am at the beginning.');
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
