// ==UserScript==
// @name         Control GIFs with arrow key
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Opens link with text "&gt;&gt;" using the right arrow key.
// @author       You
// @match        https://www.rouming.cz/roumingGIF.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // identifying the Control panels (should be two of them)
    let controls = document.getElementsByClassName('control');
    if (controls && controls.length === 2) {
        console.log('Found Two control panels');
        controls[0].setAttribute('id', 'control-panel-up');
        controls[1].setAttribute('id', 'control-panel-down');
    }
    else {
        console.log('Not found expected control panels, found: ', controls ?? controls.length);
    }

    // identifying the tables
    let tables = document.querySelectorAll('table');
    console.log('Tables found: ', tables ?? tables.length);
    if (tables) {
        tables[1].setAttribute('id', 'table-video');
        tables[2].setAttribute('id', 'table-comments');
        console.log('Identified tables: ', tables[1], tables[2])
    }

    //move comments from wrapper -> sidebar
    let middle = document.querySelector('.middle');
    console.log('Middle:', middle);
    let sidebar = document.querySelector('.sidebar');
    if (middle && sidebar) {
        console.log('Found middle and sidebar:', middle, sidebar);
        let middleComments = document.getElementById('table-comments');
        if (middleComments) {
            console.log('Found middleComment:', middleComments);
            sidebar.appendChild(middleComments);
        }
    }

    // Video eleemtn max height:
    window.onload = function() {
        let video = document.getElementById('video');
        if (video) {
            video.style.maxHeight   = '900px';
            video.style.maxWidth    = '900px';
            video.loop = false;
        }
    };


    // Find all links on the page
    let links = document.querySelectorAll('a');

    // Iterate through each link
    links.forEach(
      function(link) {
        // If the link contains the text "&gt;&gt;"
        if (link.textContent.includes('&gt;&gt;') || link.textContent.includes('>>')) {
            //console.log('Found:', link);
            link.classList.add('next-gif');
            //console.log(link);
        }
        if (link.textContent.includes('&lt;&lt;') || link.textContent.includes('<<')) {
            //console.log('Found:', link);
            link.classList.add('prev-gif');
            //console.log(link);
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
                //console.log(nextGifLink.href);
                // Increase volume by 10%
                video.volume = video.volume + 0.1;
            }
        }
        else if (e.keyCode == '40') {
            // down arrow
            console.log('ˇˇ');
            if (nextGifLink) {
                //console.log(nextGifLink.href);
                // Mute the volume
                video.volume = 0;
            }
        }
        else if (e.keyCode == '37') {
            // left arrow
            //console.log('<<');
            if (prevGifLink) {
                //console.log(prevGifLink.href);

                window.location.href = prevGifLink.href;
            }
            else {
                //console.log('I am at the beginning.');
                window.location.href = 'https://www.rouming.cz/';
            }
        }
        else if (e.keyCode == '39') {
            // right arrow
            console.log('>>');
            if (nextGifLink) {
                //console.log(nextGifLink.href);

                window.location.href = nextGifLink.href;
            }
        }

    }

})();
