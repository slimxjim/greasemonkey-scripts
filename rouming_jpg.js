// ==UserScript==
// @name         Control JPGs - styling
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Opens link with text "&gt;&gt;" using the right arrow key.
// @author       You
// @match        https://www.rouming.cz/roumingShow.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // identifying the Control panels (should be two of them)
    let controls = document.getElementsByClassName('control');
    if (controls && controls.length === 3) {
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
    // window.onload = function() {
    //     let video = document.getElementById('video');
    //     if (video) {
    //         video.style.maxHeight   = '750px';
    //         video.style.maxWidth    = '900px';
    //         video.loop = false;
    //     }
    // };

    // Find wrapper
    let wrapper = document.querySelector('.wrapper');


    // Find all links on the page
    let imgs = document.querySelectorAll('img');

    // Iterate through each link
    imgs.forEach(
      function(img) {
        console.log(img);
        // If the link contains the text "&gt;&gt;"
        if (img.style.height === 'auto' && img.style.maxWidth === '100%') { // ('height: auto; max-width: 100%;')
            console.log('Found:', img);
            img.style.maxHeight = '750px';
            img.style.maxWidth    = '900px';
            img.style.height = null;
        }
    });


})();
